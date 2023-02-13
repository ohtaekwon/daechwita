import React from "react";
import Router from "routes/Router";
import { authService } from "lib/firebase/firebase.config";
import { getUserFromCookie } from "lib/firebase/userCookies";

import Footer from "components/footer";
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

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : "Iniitiallize..."}
      <Footer />
    </>
  );
}

export default App;
