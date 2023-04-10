/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Props } from "./index.types";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const FirebaseAuth = ({
  handleSubmit,
  renderAuth,
  newAccount,

  toggleAccount,
  logInRefs,
  signUpRefs,
  error,
}: React.PropsWithChildren<Props>) => {
  const [value, setValue] = React.useState("login");
  const submitValue = newAccount ? "로그인" : "회원가입";

  const loginFormRef = React.useRef<HTMLFormElement>(null);
  const loginText = React.useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => {
      return e.target.value;
    });

    if (value === "login") {
      loginFormRef.current!.style.marginLeft = "-50%";
      loginText.current!.style.marginLeft = "-50%";
    } else {
      loginFormRef.current!.style.marginLeft = "0%";
      loginText.current!.style.marginLeft = "0%";
    }
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
              <div className="title login" ref={loginText} css={titleStyle}>
                로그인
              </div>
              <div className="title signup" css={titleStyle}>
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
                    background: -webkit-linear-gradient(left, #7733e4, #4484dd);
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
                <LogIn
                  handleSubmit={handleSubmit}
                  submitValue={submitValue}
                  refs={logInRefs}
                  loginFormRef={loginFormRef}
                  error={error}
                />

                <SignUp
                  handleSubmit={handleSubmit}
                  submitValue={submitValue}
                  refs={signUpRefs}
                  error={error}
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

const titleStyle = css`
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
