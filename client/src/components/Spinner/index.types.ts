import { HTMLAttributes } from "react";
import { theme } from "styles";

export interface PageLoaderProps {
  /**
   * Spinner의 배경 색상을 설정합니다.
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;
  /**
   * Spinner의 한바퀴 회전의 시간을 설정합니다.
   * @default 'inherit'
   */
  loadingTime?: number;
}

export interface Props extends HTMLAttributes<HTMLElement>, PageLoaderProps {
  pageLoader?: boolean;
  individualLoader?: boolean;
}
