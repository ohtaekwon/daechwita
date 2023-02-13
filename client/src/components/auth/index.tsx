import React from "react";
import Button from "_common/components/button";
import * as Styled from "./index.styles";
import { Props } from "./index.types";
import { signInWithGoogle } from "lib/firebase/provider";

const FirebaseAuth = ({
  as = "div",
  className = "",
  email = "",
  password = "",
  handleSubmit,
  handleEmailChange,
  handlePasswordChange,
  renderAuth,
  newAccount,
  toggleAccount,
  error,
  children,
  ...rest
}: React.PropsWithChildren<Props>) => {
  return (
    <Styled.Wrapper as={as} className={className} {...rest}>
      {renderAuth ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email.."
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password..."
              onChange={handlePasswordChange}
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
      ) : null}
    </Styled.Wrapper>
  );
};
export default FirebaseAuth;
