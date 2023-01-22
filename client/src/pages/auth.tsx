import React, { SyntheticEvent } from "react";
import Button from "_common/components/button";
import { signInWithGoogle } from "lib/firebase/provider";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "lib/firebase/firebase.config";

type ErrorWithMessage = {
  message: string;
};
const Auth = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [newAccount, setNewAccount] = React.useState(false);
  const [error, setError] = React.useState("");

  const onChange = (e: SyntheticEvent) => {
    // console.log((e.target as HTMLInputElement).name);
    const {
      target: { name, value },
    } = e as any;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    console.log(name, value);
  };
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

  return (
    <>
      <h1>Auth 페이지 입니다.</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email.."
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password..."
          onChange={onChange}
          required
        />
        <input
          type="submit"
          value={newAccount ? "로그인하기" : "회원가입하기"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <Button variant={"primary"} onClick={signInWithGoogle}>
          Continue with Google
        </Button>
        <Button variant={"primary"}>Continue with Github</Button>
      </div>
    </>
  );
};

export default Auth;
