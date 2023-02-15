import { HTMLAttributes, ReactChild } from "react";

export interface PortalType {}

export interface PortalProps extends HTMLAttributes<HTMLElement>, PortalType {
  elementId: string;

  children: ReactChild | ReactChild[];
}
export interface ModalType {
  show: boolean;
}

export interface ModalProps extends HTMLAttributes<HTMLElement>, ModalType {
  elementId: string;
  cancel: () => void;
  children?: React.ReactNode;
}
