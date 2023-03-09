import { HTMLAttributes, ReactChild } from "react";

export interface PortalType {}

export interface PortalProps extends HTMLAttributes<HTMLElement>, PortalType {
  /**
   * portal컴포넌트에서 getElementById에 사용할 element의 id
   */
  elementId: string;
  children: ReactChild | ReactChild[];
}
export interface ModalType {
  /**
   * modal의 boolean을 통한 display변환
   */
  show: boolean;
}

export interface ModalProps extends HTMLAttributes<HTMLElement>, ModalType {
  /**
   * portal에 Prop으로 내려줄 element의 id
   */
  elementId: string;
  /**
   * modal을 닫기 위한 토글 이벤트
   */
  modalType: "delete" | "update";
  cancel: (e: React.SyntheticEvent) => void;
  children?: React.ReactNode;
}
