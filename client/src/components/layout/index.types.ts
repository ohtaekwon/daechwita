import type { ElementType, HTMLAttributes, ReactNode } from "react";

export type LayoutType = "sm" | "md" | "lg" | "default" | "xl" | "1/2/80";
export interface LayoutProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
  /**
   * Layout의 variant을 설정합니다.
   *
   * @required
   */
  variant: LayoutType;
}
export interface Props extends HTMLAttributes<HTMLElement>, LayoutProps {
  children?: ReactNode;
}
