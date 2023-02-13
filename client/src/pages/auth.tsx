import React, { SyntheticEvent } from "react";
import Button from "_common/components/button";
import { signInWithGoogle } from "lib/firebase/provider";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "lib/firebase/firebase.config";
import { getUserFromCookie } from "lib/firebase/userCookies";
import useInput from "hooks/app/useInput";
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
    e.preventDefault(); // 기본 행위 방지
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
      console.log(data);
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
        as="form"
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
function getFirebase() {
  throw new Error("Function not implemented.");
}
