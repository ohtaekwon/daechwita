import { ElementType, HTMLAttributes } from "react";

export interface AuthProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
}
export interface Props extends HTMLAttributes<HTMLElement>, AuthProps {
  children?: React.ReactNode;
  email: string;
  password: string;
  handleSubmit: (e: React.SyntheticEvent) => Promise<void>;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newAccount: boolean;
  toggleAccount: () => void;
  error: string;
  renderAuth: boolean;
}
