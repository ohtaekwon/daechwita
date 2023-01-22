import React from "react";
import Header from "components/header";
import DefaultRouter from "routes/defaultRouter";
import { authService } from "lib/firebase/firebase.config";

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

  return (
    <>
      {init ? <DefaultRouter isLoggedIn={isLoggedIn} /> : "Iniitiallize..."}
      <footer>&copy; tk {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
