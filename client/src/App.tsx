import React from "react";
import "./lib/apis/utils/global";

import Router from "routes/Router";
import { authService } from "lib/firebase/firebase.config";

import Footer from "components/footer";
import useUser from "lib/firebase/useUser";
import { getUserFromCookie, setUserCookie } from "lib/firebase/userCookies";

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
