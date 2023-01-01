import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";

export type LayoutType = "sm" | "md" | "lg" | "default" | "xl";

export interface LayoutProps {
  /**
   * Layout의 variant을 설정합니다.
   *
   * @required
   */
  variant: LayoutType;

  /**
   *  Layout의 flex-direction 속성을 설정합니다.
   *
   * @default 'row'
   */
  direction?: CSSProperties["flexDirection"];
}

export interface Props extends HTMLAttributes<HTMLElement>, LayoutProps {
  children?: ReactNode;
}
