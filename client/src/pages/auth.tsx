/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import useInput from "hooks/app/useInput";
import { authService } from "lib/firebase/firebase.config";
import { setUserCookie } from "lib/firebase/userCookies";
import { mapUserData } from "lib/firebase/mapUserData";

import FirebaseAuth from "components/auth";
import Grid from "_common/components/grid";

const Auth = () => {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const [newAccount, setNewAccount] = React.useState(true);
  const [error, setError] = React.useState("");
  const [token, setToken] = React.useState("");

  const [renderAuth, setRenderAuth] = React.useState(false);

  const refs = {
    emailRef: React.useRef<HTMLInputElement | string | any>(null),
    passwordRef: React.useRef<HTMLInputElement | any>(null),
    passwordCheckRef: React.useRef<HTMLInputElement>(null),
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
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
          refs.emailRef.current,
          refs.passwordRef.current
        );
      }

      const userData = mapUserData(data.user);
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

  console.log(refs.emailRef.current);

  return (
    <>
      <Grid
        as="main"
        display="grid"
        placeItems="center"
        css={css`
          width: 100%;
          height: 100%;
          background: -webkit-linear-gradient(left, #a445b2, #fa4299);
        `}
      >
        <FirebaseAuth
          email={email}
          password={password}
          handleSubmit={onSubmit}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          newAccount={newAccount}
          toggleAccount={toggleAccount}
          error={error}
          renderAuth={renderAuth}
          refs={refs}
        />
      </Grid>
    </>
  );
};

export default Auth;

// import React, { SyntheticEvent } from "react";
// import Button from "_common/components/button";
// import { signInWithGoogle } from "lib/firebase/provider";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { authService } from "lib/firebase/firebase.config";

// type ErrorWithMessage = {
//   message: string;
// };
// const Auth = () => {
//   const [email, setEmail] = React.useState<string>("");
//   const [password, setPassword] = React.useState<string>("");
//   const [newAccount, setNewAccount] = React.useState(false);
//   const [error, setError] = React.useState("");

//   const onChange = (e: SyntheticEvent) => {
//     // console.log((e.target as HTMLInputElement).name);
//     const {
//       target: { name, value },
//     } = e as any;
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "password") {
//       setPassword(value);
//     }
//     console.log(name, value);
//   };
//   const onSubmit = async (e: SyntheticEvent) => {
//     e.preventDefault(); // 기본 행위 방지
//     try {
//       let data;
//       if (newAccount) {
//         // LOG IN
//         data = await signInWithEmailAndPassword(authService, email, password);
//       } else {
//         // CREATE ACCOUNT
//         data = await createUserWithEmailAndPassword(
//           authService,
//           email,
//           password
//         );
//       }
//       console.log(data);
//     } catch (error) {
//       {
//         error instanceof Error && setError(error.message);
//       }
//     }
//   };

//   const toggleAccount = () => setNewAccount((prev) => !prev);

//   return (
//     <>
//       <h1>Auth 페이지 입니다.</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           name="email"
//           value={email}
//           placeholder="Email.."
//           onChange={onChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={password}
//           placeholder="Password..."
//           onChange={onChange}
//           required
//         />
//         <input
//           type="submit"
//           value={newAccount ? "로그인하기" : "회원가입하기"}
//         />
//         {error}
//       </form>
//       <span onClick={toggleAccount}>
//         {newAccount ? "Sign in" : "Create Account"}
//       </span>
//       <div>
//         <Button variant={"primary"} onClick={signInWithGoogle}>
//           Continue with Google
//         </Button>
//         <Button variant={"primary"}>Continue with Github</Button>
//       </div>
//     </>
//   );
// };

// export default Auth;
