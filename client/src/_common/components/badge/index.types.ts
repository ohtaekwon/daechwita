import type {
  AriaRole,
  CSSProperties,
  ElementType,
  HTMLAttributes,
} from "react";
import { theme } from "styles";

export type BadgeType =
  | "primary"
  | "default"
  | "gray"
  | "red"
  | "green"
  | "blue";

export interface BadgeProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;
  variant?: BadgeType;
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
   * Badge의 width 속성을 설정합니다.
   *
   * @default auto
   */
  width?: string;

  /**
   * Badge의 cursor 속성을 설정합니다.
   *
   * @default 'auto'
   */
  cursor?: CSSProperties["cursor"];
}
export interface Props extends HTMLAttributes<HTMLElement>, BadgeProps {}
