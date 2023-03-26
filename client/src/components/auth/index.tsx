import React from "react";
import Button from "_common/components/button";
import * as Styled from "./index.styles";
import { Props } from "./index.types";
import { signInWithGoogle } from "lib/firebase/provider";
import Input from "_common/components/input";
import Form from "_common/components/form";
import Text from "_common/components/text";

import { css } from "@emotion/react";

const FirebaseAuth = ({
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
    <Styled.Wrapper className={className} {...rest}>
      {renderAuth ? (
        <>
          <Button
            variant="primary"
            fontSize="xxl"
            fontWeight={700}
            marginTop={30}
            color="zinc_900"
            css={css({
              display: "block",
              height: "50px",
            })}
            onClick={toggleAccount}
          >
            {newAccount ? "Sign in" : "Create Account"}
          </Button>
          <Form
            display="flex"
            direction="column"
            style={{ border: 0 }}
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              name="email"
              value={email}
              placeholder="Email.."
              onChange={handleEmailChange}
              required
            />
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="Password..."
              onChange={handlePasswordChange}
              required
            />
            <Input
              width="200px"
              height="50px"
              name="submit"
              type="submit"
              value={newAccount ? "로그인하기" : "회원가입하기"}
            />
          </Form>
          <Text
            fontSize="xl"
            fontWeight={700}
            textAlign="center"
            marginTop={20}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {error}
          </Text>
          {/* <div>
            <Button variant={"primary"} onClick={signInWithGoogle}>
              Continue with Google
            </Button>
            <Button variant={"primary"}>Continue with Github</Button>
          </div> */}
        </>
      ) : null}
    </Styled.Wrapper>
  );
};
export default FirebaseAuth;
