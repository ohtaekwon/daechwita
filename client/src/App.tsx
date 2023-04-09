import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import "./lib/apis/utils/global";
import { authService } from "lib/firebase/firebase.config";
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie,
} from "lib/firebase/userCookies";
import ProgressBar from "components/ProgressBar";

const Router = React.lazy(() => import("routes/Router"));

function App() {
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
    const cookie = getUserFromCookie();
    handleAuthStatus(cookie);
  }, []);

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        user
          .getIdToken(true)
          .then((idToken) => {
            removeUserCookie();
            setUserCookie(idToken);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setIsLoggedIn(false);
        removeUserCookie();
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init && <Router isLoggedIn={isLoggedIn} />}
      {!init && (
        <ProgressBar
          backgroundColor="violet_900"
          loadingTime={1}
          loadingText="준비중입니다."
        />
      )}
    </>
  );
}

export default App;
