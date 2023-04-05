import React from "react";
import { useNavigate } from "react-router-dom";

import Router from "routes/Router";
import "./lib/apis/utils/global";
import { authService } from "lib/firebase/firebase.config";
import { getUserFromCookie } from "lib/firebase/userCookies";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "store/atoms";
import cookies from "js-cookie";

function App() {
  // const cookie = cookies.get("Daechwita");

  const token = useRecoilValue(tokenAtom);
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
      console.log("여기는 user", user);
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

  console.log(token);

  return <>{init ? <Router isLoggedIn={isLoggedIn} /> : "loading..."}</>;
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
