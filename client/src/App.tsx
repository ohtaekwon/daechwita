import React from "react";
import "./lib/apis/utils/global";

import Router from "routes/Router";
import { authService } from "lib/firebase/firebase.config";

import Footer from "components/footer";
import useUser from "lib/firebase/useUser";
import { getUserFromCookie, setUserCookie } from "lib/firebase/userCookies";

function App() {
  const [uid, setUid] = React.useState<string | undefined>("");
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleAuthStatus = async (cookie: any) => {
    if (!cookie) {
      await authService.signOut();
      setUid(undefined);
    }
  };

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  React.useEffect(() => {
    const cookie = getUserFromCookie();
    handleAuthStatus(cookie);
  }, []);

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : "Iniitiallize..."}
      <Footer />
    </>
  );
}

export default App;
