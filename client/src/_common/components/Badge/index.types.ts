import type {
  AriaRole,
  CSSProperties,
  ElementType,
  HTMLAttributes,
} from "react";
import { theme } from "styles";

export type BadgeType =
  /**
   * Badge의 색상 타입을 설정합니다.
   */
  | "primary"
  | "default"
  | "gray"
  | "red"
  | "green"
  | "blue"
  | "stone"
  | "neutral"
  | "zinc"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "indigo"
  | "purple";

export interface BadgeProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
  /**
   * Badge의 유형 설정
   */
  variant?: BadgeType;
  /**
   *  Badge의 position의 타입을 설정합니다.
   *
   * @default static
   */
  position?: CSSProperties["position"];

  /**
   * Badge의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;
  /**
   * Badge의 padding을 설정합니다.
   *
   * @default 0
   */
  padding?: CSSProperties["padding"];
  /**
   * Badge의 padding 상단을 설정합니다.
   *
   * @default 0
   */
  paddingTop?: number;

  /**
   * Badge의 padding 우측을 설정합니다.
   *
   * @default 0
   */
  paddingRight?: number;
  /**
   * Badge의 padding 하단을 설정합니다.
   *
   * @default 0
   */
  paddingBottom?: number;

  /**
   * Badge의 padding 좌측을 설정합니다.
   *
   * @default 0
   */
  paddingLeft?: number;
  /**
   * Badge의 margin을 설정합니다.
   *
   * @default 0
   */
  margin?: CSSProperties["margin"];
  /**
   * Badge의 margin 상단을 설정합니다.
   *
   * @default 0
   */
  marginTop?: number;

  /**
   * Badge의 margin 우측을 설정합니다.
   *
   * @default 0
   */
  marginRight?: number;
  /**
   * Badge의 margin 하단을 설정합니다.
   *
   * @default 0
   */
  marginBottom?: number;
  /**
   * Badge의 margin 좌측을 설정합니다.
   *
   * @default 0
   */
  marginLeft?: number;
  /**
   * Badge의 width 속성을 설정합니다.
   *
   * @default auto
   */
  width?: string;
  /**
   * Badge의 height 속성을 설정합니다.
   *
   * @default auto
   */
  height?: CSSProperties["height"];

  /**
   * Badge의 cursor 속성을 설정합니다.
   *
   * @default 'auto'
   */
  cursor?: CSSProperties["cursor"];
}
export interface Props extends HTMLAttributes<HTMLElement>, BadgeProps {
  /**
   * 엘리먼트의 role 을 설정합니다.
   *
   * @default ''
   */
  role?: AriaRole | undefined;
}
