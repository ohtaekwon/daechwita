import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { theme } from "styles";

export interface SectionProps {
  /**
   * Section의 엘리먼트의 타입을 설정합니다.
   * @default div
   */
  as?: ElementType;

  /**
   * Section의 width을 설정합니다.
   * @default auto
   */
  width?: CSSProperties["width"];

  /**
   * Section의 height을 설정합니다.
   * @default auto
   */
  height?: CSSProperties["height"];

  /**
   * Section의 display을 설정합니다.
   * @default block
   */
  display?: CSSProperties["display"];

  /**
   * Section의 flex일 경우 direction을 설정합니다.
   * @default 'row'
   */
  direction?: "row" | "column";

  /**
   * Section의 grid일 경우 grid-template-areas를 설정합니다.
   * @default ''
   */
  gridTemplateAreas?: CSSProperties["gridTemplateAreas"];

  /**
   * Section의 grid일 경우 grid-template-column을 설정합니다.
   * @default ''
   */
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"];

  /**
   * Section의 grid일 경우 grid-areas를 설정합니다.
   * @default ''
   */
  gridArea?: CSSProperties["gridArea"];

  /**
   * Section의 grid일 경우 grid-template-row를 설정합니다.
   * @default ''
   */
  gridTemplateRows?: CSSProperties["gridTemplateRows"];

  /**
   * Section의 padding 상단을 설정합니다.
   * @default 16px
   */
  padding?: CSSProperties["padding"];

  /**
   * Section의 padding 상단을 설정합니다.
   * @default 0
   */
  paddingTop?: number;

  /**
   * Section의 padding 우측을 설정합니다.
   * @default 0
   */
  paddingRight?: number;

  /**
   * Section의 padding 하단을 설정합니다.
   * @default 0
   */
  paddingBottom?: number;

  /**
   * Section의 padding 좌측을 설정합니다.
   * @default 0
   */
  paddingLeft?: number;

  /**
   * Section의 margin 상단을 설정합니다.
   * @default 0
   */
  marginTop?: number;

  /**
   * Section의 margin 우측을 설정합니다.
   * @default 0
   */
  marginRight?: number;

  /**
   * Section의 margin 하단을 설정합니다.
   * @default 0
   */
  marginBottom?: number;

  /**
   * Section의 margin 좌측을 설정합니다.
   * @default 0
   */
  marginLeft?: number;

  /**
   * Section의 margin을 설정합니다.
   * @default inherit
   */
  margin?: CSSProperties["margin"];

  /**
   * Section의 배경 색상을 설정합니다.
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;
  /**
   * Section의 배경 색상을 설정합니다.
   * @default 'inherit'
   */
  backgroundImage?: CSSProperties["backgroundImage"];
}

export interface Props extends HTMLAttributes<HTMLElement>, SectionProps {
  children?: ReactNode;
  pageTitle?: ReactNode;
}
