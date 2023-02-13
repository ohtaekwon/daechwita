import React, { SyntheticEvent } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import useInput from "hooks/app/useInput";
import { authService } from "lib/firebase/firebase.config";
import { setUserCookie } from "lib/firebase/userCookies";
import { mapUserData } from "lib/firebase/mapUserData";

import FirebaseAuth from "components/auth";

type ErrorWithMessage = {
  message: string;
};
const Auth = () => {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const [newAccount, setNewAccount] = React.useState(false);
  const [error, setError] = React.useState("");
  const [token, setToken] = React.useState("");

  const [renderAuth, setRenderAuth] = React.useState(false);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        // LOG IN
        data = await signInWithEmailAndPassword(authService, email, password);
      } else {
        // CREATE ACCOUNT
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      }

      const userData = mapUserData(data.user);
      console.log("userData", userData);
      setUserCookie(userData);
    } catch (error) {
      {
        error instanceof Error && setError(error.message);
      }
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);
  return (
    <>
      <h1>Auth 페이지 입니다.</h1>
      <FirebaseAuth
        as="div"
        email={email}
        password={password}
        handleSubmit={onSubmit}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        newAccount={newAccount}
        toggleAccount={toggleAccount}
        error={error}
        renderAuth={renderAuth}
      />
    </>
  );
};

export default Auth;
