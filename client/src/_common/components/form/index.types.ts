import type {
  AriaRole,
  Attributes,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  HtmlHTMLAttributes,
} from "react";
import { theme } from "styles";

export interface FormProps {
  /**
   * 1️⃣ form 태그의 HTML 속성을 설정합니다.
   */

  /**
   * 엘리먼트의 role 을 설정합니다.
   *
   * @default ''
   */
  role?: AriaRole | undefined;
  /**
   * form 태그의 action 을 설정합니다.
   *
   * @default ''
   */
  action?: string;

  /**
   * 2️⃣ form 컴포넌트의 style 을 설정합니다.
   */

  /**
   *  form의 position의 타입을 설정합니다.
   *
   * @default static
   */
  position?: CSSProperties["position"];

  /**
   * form의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;

  /**
   * form의 border 색상을 설정합니다.
   *
   * @default 'inherit'
   */

  borderColor?: keyof typeof theme.colors;
  /**
   * form의 display가 grid일 때, grid-area의 타입을 설정합니다.
   *
   * @default static
   */
  gridArea?: CSSProperties["gridArea"];

  /**
   * Form의 padding을 설정합니다.
   *
   * @default auto
   */
  padding?: CSSProperties["padding"];

  /**
   * Form의 padding 상단을 설정합니다.
   *
   * @default 0
   */
  paddingTop?: number;
  /**
   * Form의 padding 우측을 설정합니다.
   *
   * @default 0
   */
  paddingRight?: number;
  /**
   * Form의 padding 하단을 설정합니다.
   *
   * @default 0
   */
  paddingBottom?: number;
  /**
   * Form의 padding 좌측을 설정합니다.
   *
   * @default 0
   */
  paddingLeft?: number;

  /**
   * Form의 margin을 설정합니다.
   *
   * @default auto
   */
  margin?: CSSProperties["margin"];
  /**
   * Form의 margin 상단을 설정합니다.
   *
   * @default 0
   */
  marginTop?: number;
  /**
   * Form의 margin 우측을 설정합니다.
   *
   * @default 0
   */
  marginRight?: number;
  /**
   * Form의 margin 하단을 설정합니다.
   *
   * @default 0
   */
  marginBottom?: number;
  /**
   * Form의 margin 좌측을 설정합니다.
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
   * Form의 radius 설정합니다.
   *
   * @default 8
   */
  radius?: number;
}
export interface Props extends HTMLAttributes<HTMLFormElement>, FormProps {
  /**
   * form 컴포넌트의 엘리먼트의 role 을 설정합니다.
   *
   * @default ''
   */
  role?: AriaRole | undefined;
  /**
   * form 태그의 action 을 설정합니다.
   *
   * @default ''
   */
  action?: string;
  /**
   * form 컴포넌트의 onSubmit 이벤트 핸들러를 설정합니다.
   *
   * @default ''
   */
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
  onClick?: () => void;
}
