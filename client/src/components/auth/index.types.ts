import { HTMLAttributes } from "react";

type Refs = {
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  passwordCheckRef: React.RefObject<HTMLInputElement>;
};

export interface Props extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  handleSubmit: (e: React.SyntheticEvent) => Promise<void>;
  newAccount: boolean;
  toggleAccount: () => void;
  error: string;
  renderAuth: boolean;
  logInRefs: Omit<Refs, "passwordCheckRef">;
  signUpRefs: Refs;
}

export interface LogInProps {
  handleSubmit: (e: React.SyntheticEvent<Element, Event>) => Promise<void>;
  submitValue: "로그인" | "회원가입";
  refs: Omit<Refs, "passwordCheckRef">;
  loginFormRef: React.RefObject<HTMLFormElement>;
  error: string;
}

export interface SignUpProps {
  handleSubmit: (e: React.SyntheticEvent<Element, Event>) => Promise<void>;
  submitValue: "로그인" | "회원가입";
  refs: Refs;
  error: string;
}
