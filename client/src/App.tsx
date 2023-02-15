import React from "react";
import "./lib/apis/utils/global";

import Router from "routes/Router";
import { authService } from "lib/firebase/firebase.config";

import Footer from "components/footer";

function App() {
  const [init, setInit] = React.useState(false);
  const [cookie, setCookie] = React.useState<string>();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCookie(user?.uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  // React.useEffect(() => {
  //   setCookie(user?.uid);
  // }, [user]);
  // console.log("cookie", cookie);
  // console.log(init, isLoggedIn);
  return (
    <>
      {init ? (
        <Router isLoggedIn={isLoggedIn} cookie={cookie} />
      ) : (
        "Iniitiallize..."
      )}
      <Footer />
    </>
  );
}

export default App;
