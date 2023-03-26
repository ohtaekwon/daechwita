import React from "react";
import { useNavigate } from "react-router-dom";

import Router from "routes/Router";
import "./lib/apis/utils/global";
import { authService } from "lib/firebase/firebase.config";
import { getUserFromCookie } from "lib/firebase/userCookies";

function App() {
  const navigate = useNavigate();
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleAuthStatus = async (cookie: any) => {
    if (!cookie) {
      await authService.signOut();
      navigate("/");
    }
  };

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

  React.useEffect(() => {
    const cookie = getUserFromCookie();
    // console.log(cookie);

    handleAuthStatus(cookie);
  }, []);

  return <>{init ? <Router isLoggedIn={isLoggedIn} /> : "loading..."}</>;
}

export default App;
