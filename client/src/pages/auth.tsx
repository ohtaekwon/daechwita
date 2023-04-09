/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { tokenAtom } from "store/atoms";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "lib/firebase/firebase.config";
import { setUserCookie } from "lib/firebase/userCookies";

import FirebaseAuth from "components/Auth";
import Grid from "_common/components/Grid";
import { errorToKR } from "components/Auth/handler";

const Auth = () => {
  const [token, setToken] = useRecoilState(tokenAtom);

  const [newAccount, setNewAccount] = React.useState(true);
  const [error, setError] = React.useState("");

  const [renderAuth, setRenderAuth] = React.useState(false);

  const logInRefs = {
    emailRef: React.useRef<HTMLInputElement | string | any>(null),
    passwordRef: React.useRef<HTMLInputElement | any>(null),
  };
  const signUpRefs = {
    emailRef: React.useRef<HTMLInputElement | string | any>(null),
    passwordRef: React.useRef<HTMLInputElement | any>(null),
    passwordCheckRef: React.useRef<HTMLInputElement>(null),
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      let data;
      if (newAccount) {
        /**
         * @description LOGIN
         */
        data = await signInWithEmailAndPassword(
          authService,
          logInRefs.emailRef.current,
          logInRefs.passwordRef.current
        );
      } else {
        /**
         * @description SIGNUP
         */
        data = await createUserWithEmailAndPassword(
          authService,
          signUpRefs?.emailRef.current,
          signUpRefs?.passwordRef.current
        );
      }

      const token = await data.user.getIdToken();

      setToken(token);
      setUserCookie(token);
    } catch (error) {
      {
        error instanceof Error && setError(errorToKR(error.message));
      }
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  }, []);

  React.useEffect(() => {
    setError("");
  }, [newAccount]);

  return (
    <>
      <Grid
        as="main"
        display="grid"
        placeItems="center"
        css={css`
          width: 100%;
          height: 100%;
          background: -webkit-linear-gradient(left, #7733e4, #4484dd);
        `}
      >
        <FirebaseAuth
          handleSubmit={onSubmit}
          newAccount={newAccount}
          toggleAccount={toggleAccount}
          error={error}
          renderAuth={renderAuth}
          logInRefs={logInRefs}
          signUpRefs={signUpRefs}
        />
      </Grid>
    </>
  );
};

export default Auth;
