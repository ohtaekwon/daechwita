/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Props } from "./index.types";
import SignUp from "./signUp";

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
  refs,
  ...rest
}: React.PropsWithChildren<Props>) => {
  const [value, setValue] = React.useState("login");
  const submitValue = newAccount ? "로그인" : "회원가입";

  const loginFormRef = React.useRef<HTMLFormElement>(null);
  const loginTextRef = React.useRef<HTMLDivElement>(null);

  const signUpFormRef = React.useRef<HTMLFormElement>(null);
  const signUpTextRef = React.useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => {
      return e.target.value;
    });

    if (value === "login") {
      loginFormRef.current!.style.marginLeft = "-50%";
      loginTextRef.current!.style.marginLeft = "-50%";
    } else {
      loginFormRef.current!.style.marginLeft = "0%";
      loginTextRef.current!.style.marginLeft = "0%";
    }
  };

  const handleNewChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: React.MutableRefObject<any>
  ) => {
    ref.current = e.target.value;
    console.log(ref.current);
  };

  return (
    <>
      {renderAuth ? (
        <>
          <div
            className="wrapper"
            css={css`
              max-width: 390px;
              background: #fff;
              padding: 30px;
              border-radius: 5px;
              box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            `}
          >
            <div
              className="title-text"
              css={css`
                display: flex;
                width: 200%;
              `}
            >
              <div className="title login" ref={loginTextRef} css={titleStyle}>
                로그인
              </div>
              <div
                className="title signup"
                ref={signUpTextRef}
                css={titleStyle}
              >
                회원가입
              </div>
            </div>
            <div
              className="form-container"
              css={css`
                width: 100%;
                overflow: hidden;
              `}
            >
              <div
                className="slide-controls"
                css={css`
                  position: relative;
                  display: flex;
                  height: 50px;
                  width: 100%;
                  margin: 30px 0 10px 0;
                  border-radius: 5px;
                  overflow: hidden;
                  justify-content: space-between;
                  border: 1px solid lightgrey;
                  #signup:checked ~ .slide-tab {
                    left: 50%;
                  }
                  #signup:checked ~ .login {
                    color: #000;
                  }
                  #signup:checked ~ .signup {
                    color: #fff;
                  }
                `}
              >
                <input
                  type="radio"
                  name="slider"
                  id="login"
                  value="login"
                  onChange={handleChange}
                  onClick={toggleAccount}
                  checked={value === "login"}
                  css={css`
                    display: none;
                  `}
                />
                <input
                  type="radio"
                  name="slider"
                  id="signup"
                  value="signup"
                  onChange={handleChange}
                  onClick={toggleAccount}
                  checked={value === "signup"}
                  css={css`
                    display: none;
                  `}
                />
                <label
                  htmlFor="login"
                  className="slide login"
                  css={css`
                    height: 100%;
                    width: 100%;
                    font-size: 18px;
                    font-weight: 700;
                    text-align: center;
                    line-height: 48px;
                    cursor: pointer;
                    z-index: 1;
                    color: #fff;
                    transition: all 0.6s ease;
                  `}
                >
                  로그인
                </label>
                <label
                  className="slide signup"
                  htmlFor="signup"
                  css={css`
                    height: 100%;
                    width: 100%;
                    font-size: 18px;
                    font-weight: 700;
                    text-align: center;
                    line-height: 48px;
                    cursor: pointer;
                    z-index: 1;
                    color: #000;
                    transition: all 0.6s ease;
                  `}
                >
                  회원가입
                </label>
                <div
                  className="slide-tab"
                  css={css`
                    position: absolute;
                    height: 100%;
                    width: 50%;
                    left: 0;
                    z-index: 0;
                    border-radius: 5px;
                    background: -webkit-linear-gradient(left, #a445b2, #fa4299);
                    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                  `}
                ></div>
              </div>

              <div
                className="form-inner"
                css={css`
                  display: flex;
                  width: 200%;
                `}
              >
                <form
                  className="login"
                  ref={loginFormRef}
                  onSubmit={handleSubmit}
                  css={formStyle}
                >
                  <div className="field" css={fieldStyle}>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      placeholder="이메일 주소"
                      onChange={handleEmailChange}
                      required
                      css={inputStyle}
                    />
                  </div>
                  <div className="field" css={fieldStyle}>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="비밀번호 6자리 이상"
                      onChange={handlePasswordChange}
                      required
                      css={inputStyle}
                    />
                  </div>
                  <div
                    className="pass-link"
                    css={css`
                      margin-top: 5px;
                    `}
                  ></div>
                  <div className="field" css={fieldStyle}>
                    <input
                      type="submit"
                      name="submit"
                      value={submitValue}
                      css={submitStyle}
                    />
                  </div>
                  <div
                    className="signup-link"
                    css={css`
                      text-align: center;
                      margin-top: 30px;
                    `}
                  >
                    회원이 아니신가요?
                    <a href="#" onClick={toggleAccount} css={anchorStyle}>
                      지금 회원가입하세요.
                    </a>
                  </div>
                </form>

                <SignUp
                  email={email}
                  password={password}
                  handleEmailChange={handleEmailChange}
                  handlePasswordChange={handlePasswordChange}
                  handleSubmit={handleSubmit}
                  submitValue={submitValue}
                  handleNewChange={handleNewChange}
                  refs={refs}
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default FirebaseAuth;

const bodyStyle = css`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  /* background: #f2f2f2; */
  background: -webkit-linear-gradient(left, #a445b2, #fa4299);
`;
const formStyle = css`
  width: 50%;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
const titleStyle = css`
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
const fieldStyle = css`
  height: 50px;
  width: 100%;
  margin-top: 20px;
`;
const inputStyle = css`
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  :focus {
    border-color: #fc83bb;
  }
`;
const anchorStyle = css`
  color: #fa4299;
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`;

const submitStyle = css`
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  background: -webkit-linear-gradient(left, #a445b2, #fa4299);
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0;
  border: 0;
  cursor: pointer;
`;

{
  /* <Button
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
          </Text> */
}

{
  /* <div>
            <Button variant={"primary"} onClick={signInWithGoogle}>
              Continue with Google
            </Button>
            <Button variant={"primary"}>Continue with Github</Button>
          </div> */
}
