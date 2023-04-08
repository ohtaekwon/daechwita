import type {
  AriaRole,
  CSSProperties,
  ElementType,
  HTMLAttributes,
} from "react";
import { theme } from "styles";

export interface SkeletonProps {
  /**
   * Box의 너비 속성을 설정합니다.
   * @default inherit
   */
  width?: CSSProperties["width"];

  /**
   * Box의 높이 속성을 설정합니다.
   * @default inherit
   */
  height?: CSSProperties["height"];
}
export interface Props extends HTMLAttributes<HTMLElement>, SkeletonProps {
  /**
   * Box컴포넌트의 엘리먼트 role 을 설정합니다.
   * @default ''
   */
  role?: AriaRole | undefined;
}
