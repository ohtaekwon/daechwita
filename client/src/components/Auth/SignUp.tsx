/** @jsxImportSource @emotion/react */
import React from "react";
import {
  fieldStyle,
  formStyle,
  inputStyle,
  submitStyle,
  validateTextStyle,
} from "./index.styles";
import { SignUpProps } from "./index.types";
import { css } from "@emotion/react";
import { emailRegEx, passwordRegEx } from "utils/validate";

const DEFAULT_VALUE = {
  email: "",
  password: "",
  passwordCheck: "",
};

const SignUp = ({ handleSubmit, submitValue, refs, error }: SignUpProps) => {
  const { emailRef, passwordRef, passwordCheckRef } = refs;

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
    } else {
      (passwordCheckRef as any).current = value;
      setInputValue((prev) => {
        return {
          ...prev,
          passwordCheck: value,
        };
      });
    }
  };

  React.useEffect(() => {
    setInputValue(DEFAULT_VALUE);
  }, [submitValue]);
  return (
    <form className="signup" onSubmit={handleSubmit} css={formStyle}>
      <div className="field" css={fieldStyle}>
        <input
          type="text"
          name="email"
          ref={emailRef}
          value={inputValue.email}
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
          placeholder="비밀 번호 6자리 이상"
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
      <div className="field" css={fieldStyle}>
        <input
          type="password"
          name="passwordCheck"
          value={inputValue.passwordCheck}
          ref={passwordCheckRef}
          placeholder="비밀 번호 확인"
          onChange={handleChange}
          required
          css={inputStyle}
        />
      </div>
      <div css={validateTextStyle}>
        {inputValue.passwordCheck.length !== 0 &&
          inputValue.password !== inputValue.passwordCheck &&
          `비밀번호가 맞지 않습니다..`}
      </div>
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

export default SignUp;
