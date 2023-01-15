import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface BoxProps {
  gridArea?: CSSProperties["gridArea"];

  /**
   * padding 상단을 설정합니다.
   *
   * @default 0
   */
  paddingTop?: number;

  /**
   * padding 우측을 설정합니다.
   *
   * @default 0
   */
  paddingRight?: number;

  /**
   * padding 하단을 설정합니다.
   *
   * @default 0
   */
  paddingBottom?: number;

  /**
   * padding 좌측을 설정합니다.
   *
   * @default 0
   */
  paddingLeft?: number;

  /**
   * margin 상단을 설정합니다.
   *
   * @default 0
   */
  marginTop?: number;

  /**
   * margin 우측을 설정합니다.
   *
   * @default 0
   */
  marginRight?: number;

  /**
   * margin 하단을 설정합니다.
   *
   * @default 0
   */
  marginBottom?: number;

  /**
   * margin 좌측을 설정합니다.
   *
   * @default 0
   */
  marginLeft?: number;

  width?: string;

  /**
   * box의 display 속성을 설정합니다.
   *
   * @default 'flex'
   */
  display?: "flex" | "inline-flex";

  /**
   * box의 flex-direction 속성을 설정합니다.
   *
   * @default 'row'
   */
  direction?: CSSProperties["flexDirection"];

  /**
   * box의 justify-content 속성을 설정합니다.
   *
   * @default 'flex-start'
   */
  justifyContent?: CSSProperties["justifyContent"];

  /**
   * box의 align-items 속성을 설정합니다.
   *
   * @default 'flex-start'
   */
  alignItems?: CSSProperties["alignItems"];
}
export interface Props extends HTMLAttributes<HTMLElement>, BoxProps {
  children?: ReactNode;
}
