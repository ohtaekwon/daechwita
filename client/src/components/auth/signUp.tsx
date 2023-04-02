/** @jsxImportSource @emotion/react */

import React from "react";
import { fieldStyle, formStyle, inputStyle, submitStyle } from "./index.styles";
import { error } from "console";

type Refs = {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  passwordCheckRef: React.RefObject<HTMLInputElement>;
};

interface Props {
  email: string;
  password: string;
  submitValue: "로그인" | "회원가입";
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  handleSubmit: (e: React.SyntheticEvent<Element, Event>) => Promise<void>;

  handleNewChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    ref: React.MutableRefObject<any>
  ) => void;
  refs: Refs;
}

const SignUp = ({
  email,
  password,
  handleSubmit,
  submitValue,
  refs,
}: Props) => {
  const { emailRef, passwordRef, passwordCheckRef } = refs;

  const [inputValue, setInputValue] = React.useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

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

      <div className="field" css={fieldStyle}>
        <input
          type="submit"
          name="submit"
          value={submitValue}
          css={submitStyle}
        />
      </div>
    </form>
  );
};

export default SignUp;
