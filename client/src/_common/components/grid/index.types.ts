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
   * @default ''
   */
  gridTemplateAreas?: CSSProperties["gridTemplateAreas"];

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
}

export interface Props extends HTMLAttributes<HTMLElement>, GridProps {}

export interface GridContainerProps {
  gridArea?: CSSProperties["gridArea"];
}
