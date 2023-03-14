import type {
  AriaRole,
  Attributes,
  CSSProperties,
  ElementType,
  HTMLAttributes,
} from "react";
import { theme } from "styles";

type InputVariant = "search_1" | "default" | "resume";

export interface InputProps {
  /**
   * input의 HTML속성 type을 설정합니다.
   *
   * @required ''
   */
  type: InputType;
  /**
   * input의 variant을 설정합니다.
   *
   * @required
   */
  variant?: InputVariant;
  /**
   * input의 position의 타입을 설정합니다.
   *
   * @default static
   */
  position?: CSSProperties["position"];

  /**
   * input의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;

  /**
   * input의 border 색상을 설정합니다.
   *
   * @default 'inherit'
   */

  borderColor?: keyof typeof theme.colors;
  /**
   * input의 box Shadow을 설정합니다.
   *
   * @default 'inherit'
   */
  boxShadow?: CSSProperties["boxShadow"];
  /**
   * grid-area의 타입을 설정합니다.
   *
   * @default static
   */
  gridArea?: CSSProperties["gridArea"];

  /**
   * padding을 설정합니다.
   *
   * @default auto
   */
  padding?: CSSProperties["padding"];

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
   * margin을 설정합니다.
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
   * @default 'block'
   */
  display?: CSSProperties["display"];

  /**
   * Form의 flex-direction 속성을 설정합니다.
   *
   * @default 'row'
   */
  direction?: CSSProperties["flexDirection"];

  /**
   * input의 justify-content 속성을 설정합니다.
   *
   * @default 'flex-start'
   */
  justifyContent?: CSSProperties["justifyContent"];

  /**
   * input의 align-items 속성을 설정합니다.
   *
   * @default 'flex-start'
   */
  alignItems?: CSSProperties["alignItems"];

  /**
   * input의 cursor 속성을 설정합니다.
   *
   * @default 'auto'
   */
  cursor?: CSSProperties["cursor"];

  /**
   * input의 opacity 속성을 설정합니다.
   *
   * @default 'inherit'
   */
  opacity?: CSSProperties["opacity"];

  /**
   * input의 radius 설정합니다.
   *
   * @default 8
   */
  radius?: number;
  /**
   * input의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  placeholderColor?: keyof typeof theme.colors;
}

export type InputType =
  /**
   * 텍스트 입력 (text, textarea)
   * 비밀번호 입력 (password)
   * 라디오 버튼 (radio)
   * 체크 박스 (checkbox)
   * 파일 선택 (file)
   * 선택 입력 (select)
   * 버튼 (button)
   * 전송 (submit)
   * 필드셋 (fieldset)
   */
  | "text"
  | "textarea"
  | "password"
  | "radio"
  | "checkbox"
  | "file"
  | "select"
  | "button"
  | "submit"
  | "fieldset";

export type InputAcceptType = "audio/*" | "video/*" | "image/*";

export interface Props extends HTMLAttributes<HTMLInputElement>, InputProps {
  /**
   * input의 HTML속성 role 을 설정합니다.
   *
   * @default ''
   */
  role?: AriaRole | undefined;
  /**
   * input의 accept속성을 설정합니다.
   *
   * @required ''
   */
  accept?: InputAcceptType;
  /**
   * input의 HTML속성 name을 설정합니다.
   *
   * @required '''
   */
  name: string;
  /**
   * input의 HTML속성 value를 설정합니다.
   *
   * @required ''
   */
  value?: any;
}
