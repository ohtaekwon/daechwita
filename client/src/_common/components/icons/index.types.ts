import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import theme from "../../../styles/theme";

export interface IconsProps {
  /**
   * Grid의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;
}

export type IconsItemType = {
  [x: string]: JSX.Element;
};

export interface Props extends HTMLAttributes<HTMLElement>, IconsProps {}
