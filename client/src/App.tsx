import React from "react";
import Router from "routes/Router";
import { authService } from "lib/firebase/firebase.config";
import cookies from "js-cookie";
import { getAuth } from "firebase/auth";
function App() {
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const cookie = cookies.get("auth");
  // console.log(JSON.parse(JSON.stringify(cookie)));

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : "Iniitiallize..."}
      <footer>&copy; tk {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
