import type {
  AriaRole,
  Attributes,
  CSSProperties,
  ElementType,
  HTMLAttributes,
} from "react";
import { theme } from "styles";

export interface InputProps {
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
   * Form의 width 속성을 설정합니다.
   *
   * @default inherit
   */
  width?: CSSProperties["width"];
  /**
   * Form의 bottom 속성을 설정합니다.
   *
   * @default inherit
   */
  height?: CSSProperties["height"];

  /**
   * Form의 display 속성을 설정합니다.
   *
   * @default 'flex'
   */
  display?: "flex" | "inline-flex";

  /**
   * Form의 flex-direction 속성을 설정합니다.
   *
   * @default 'row'
   */
  direction?: CSSProperties["flexDirection"];

  /**
   * Form의 justify-content 속성을 설정합니다.
   *
   * @default 'flex-start'
   */
  justifyContent?: CSSProperties["justifyContent"];

  /**
   * Form의 align-items 속성을 설정합니다.
   *
   * @default 'flex-start'
   */
  alignItems?: CSSProperties["alignItems"];

  /**
   * Form의 cursor 속성을 설정합니다.
   *
   * @default 'auto'
   */
  cursor?: CSSProperties["cursor"];

  /**
   * Form의 opacity 속성을 설정합니다.
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
}
export interface Props extends HTMLAttributes<HTMLInputElement>, InputProps {
  /**
   * input의 HTML속성 type을 설정합니다.
   *
   * @required '''
   */
  type: string;

  /**
   * input의 HTML속성 name을 설정합니다.
   *
   * @required '''
   */
  name: string;

  /**
   * input의 HTML속성 value을 설정합니다.
   *
   * @required '''
   */
  value: any;
}
