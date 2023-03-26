import { ElementType, HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLElement> {
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
