import { HTMLAttributes } from "react";
import { theme } from "styles";

export interface WrapperProps {
  /**
   * Wrpper의 배경 색상을 설정합니다.
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;
}

export interface LineProps {
  loadingTime?: number;
}
export interface Props
  extends HTMLAttributes<HTMLElement>,
    WrapperProps,
    LineProps {
  loadingText?: string;
}
