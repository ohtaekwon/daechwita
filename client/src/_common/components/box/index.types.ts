import type {
  AriaRole,
  Attributes,
  CSSProperties,
  ElementType,
  HTMLAttributes,
} from "react";
import { theme } from "styles";

export type BoxType =
  | "primary"
  | "default"
  | "gray_200_border"
  | "blue_200_border";

export interface BoxProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
  /**
   * 버튼의 variant을 설정합니다.
   *
   * @required
   */
  variant?: BoxType;

  /**
   * 엘리먼트의 role 을 설정합니다.
   *
   * @default ''
   */
  role?: AriaRole | undefined;
  /**
   *  Box의 position의 타입을 설정합니다.
   *
   * @default static
   */
  position?: CSSProperties["position"];

  /**
   * Box의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;

  /**
   * grid-area의 타입을 설정합니다.
   *
   * @default static
   */
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
   * margin  설정합니다.
   *
   * @default auto
   */
  margin?: CSSProperties["margin"];
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

  /**
   * box의 width 속성을 설정합니다.
   *
   * @default inherit
   */
  width?: CSSProperties["width"];
  /**
   * box의 bottom 속성을 설정합니다.
   *
   * @default inherit
   */
  height?: CSSProperties["height"];

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

  /**
   * box의 cursor 속성을 설정합니다.
   *
   * @default 'auto'
   */
  cursor?: CSSProperties["cursor"];

  /**
   * box의 opacity 속성을 설정합니다.
   *
   * @default 'inherit'
   */
  opacity?: CSSProperties["opacity"];

  /**
   * Box의 radius 설정합니다.
   *
   * @default 8
   */
  radius?: number;
  /**
   * Box의 gap 설정합니다.
   *
   * @default 0
   */
  gap?: CSSProperties["gap"];
}
export interface Props extends HTMLAttributes<HTMLElement>, BoxProps {}
