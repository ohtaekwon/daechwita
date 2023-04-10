/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import {
  fieldStyle,
  formStyle,
  inputStyle,
  submitStyle,
  validateTextStyle,
} from "./index.styles";
import { LogInProps } from "./index.types";
import { emailRegEx, passwordRegEx } from "utils/validate";

const DEFAULT_VALUE = {
  email: "",
  password: "",
};
const LogIn = ({
  handleSubmit,
  submitValue,
  refs,
  loginFormRef,
  error,
}: LogInProps) => {
  const { emailRef, passwordRef } = refs;
  const [inputValue, setInputValue] = React.useState(DEFAULT_VALUE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      (emailRef as any).current = value;
      setInputValue((prev) => {
        return {
          ...prev,
          email: value,
        };
      });
    } else if (name === "password") {
      (passwordRef as any).current = value;
      setInputValue((prev) => {
        return {
          ...prev,
          password: value,
        };
      });
    }
  };

  React.useEffect(() => {
    setInputValue(DEFAULT_VALUE);
  }, [submitValue]);

  return (
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
          value={inputValue.email}
          ref={emailRef}
          placeholder="이메일 주소"
          onChange={handleChange}
          required
          css={inputStyle}
        />
      </div>
      <div css={validateTextStyle}>
        {inputValue.email.length !== 0 &&
          !!!inputValue.email.match(emailRegEx) &&
          `이메일 형식으로 작성하셔야 합니다.`}
      </div>
      <div className="field" css={fieldStyle}>
        <input
          type="password"
          name="password"
          value={inputValue.password}
          ref={passwordRef}
          placeholder="비밀번호 6자리 이상"
          onChange={handleChange}
          required
          css={inputStyle}
        />
      </div>
      <div css={validateTextStyle}>
        {inputValue.password.length !== 0 &&
          !!!inputValue.password.match(passwordRegEx) &&
          `1개 이상의 문자 및 숫자로 최소 8자리입니다.`}
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
      {error && (
        <div
          className="signup-link"
          css={css`
            text-align: center;
            margin-top: 30px;
          `}
        >
          {error}
        </div>
      )}
    </form>
  );
};

export default LogIn;
