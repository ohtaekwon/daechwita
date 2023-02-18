import React from "react";
import "./lib/apis/utils/global";

import Router from "routes/Router";
import { authService } from "lib/firebase/firebase.config";

import Footer from "components/footer";
import { getUserFromCookie } from "lib/firebase/userCookies";
import { useNavigate } from "react-router-dom";

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
    handleAuthStatus(cookie);
  }, []);

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : "Iniitiallize..."}
      {/* <Footer /> */}
    </>
  );
}

export default App;
