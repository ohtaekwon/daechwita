import React from "react";
import Router from "routes/Router";
import { useNavigate } from "react-router-dom";
import { authService } from "lib/firebase/firebase.config";
import { getUserFromCookie } from "lib/firebase/userCookies";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "store/atoms";
import "./lib/apis/utils/global";

function App() {
  const token = useRecoilValue(tokenAtom);
  const navigate = useNavigate();
  const [init, setInit] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleAuthStatus = async (cookie: string) => {
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
    <>{init ? <Router isLoggedIn={isLoggedIn} /> : <h1>"loading..."</h1>}</>
  );
}

export default App;

// React.useEffect(() => {
//   if (token) {
//     setIsLoggedIn(true);
//   } else {
//     setIsLoggedIn(false);
//   }
//   setInit(true);
// }, []);
