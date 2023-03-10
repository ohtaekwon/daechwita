import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import theme from "styles/theme";

export interface GridProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default div
   */
  as?: ElementType;

  /**
   * Grid 의 display 속성을 설정합니다.
   *
   * @default 'grid'
   */
  display?: "grid" | "inline-grid";

  /**
   * Grid의 grid-template-areas의 속성을 설정합니다.
   *
   * @default 'none'
   */
  gridTemplateAreas?: CSSProperties["gridTemplateAreas"];

  /**
   * Grid의 grid-template-column을 설정합니다.
   *
   * @default 'none'
   */
  gridTemplateColumns?: CSSProperties["gridTemplateColumns"];

  /**
   * Grid의 grid-template-column을 설정합니다.
   *
   * @default 'auto'
   */
  gridTemplateRows?: CSSProperties["gridTemplateRows"];
  /**
   * Grid의 gap을 설정합니다.
   *
   * @default 0
   */
  gap?: number;

  /**
   * Grid의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;
  /**
   * Grid의 margin을 설정합니다.
   *
   * @default 0
   */

  margin?: CSSProperties["margin"];

  /**
   * Grid의 padding을 설정합니다.
   *
   * @default 0
   */
  padding?: CSSProperties["padding"];
  /**
   * Grid의 정렬을 설정합니다.
   *
   * @default inherit
   */
  placeItems?: CSSProperties["placeItems"];
}

export interface Props extends HTMLAttributes<HTMLElement>, GridProps {}

export interface GridContainerProps {
  gridArea?: CSSProperties["gridArea"];
}
