import type { CSSProperties, ElementType, HTMLAttributes } from "react";

import theme from "styles/theme";

export interface Props {
  /**
   * 엘리먼트의 타입을 설정합니다.
   *
   * @default span
   */
  as: ElementType;

  /**
   * 텍스트 폰트 사이즈를 설정합니다.
   *
   * @default 'regular'
   */
  fontSize: keyof typeof theme.fontSize;

  /**
   * 텍스트 폰트 높이를 설정합니다.
   *
   * @default 'regular'
   */
  lineHeight: keyof typeof theme.lineHeight;

  /**
   * 텍스트의 색상을 설정합니다.
   *
   * @default 'zinc_700'
   */
  color: keyof typeof theme.colors;

  /**
   * 텍스트 폰트 두께를 설정합니다.
   *
   * @default 400
   */
  fontWeight: CSSProperties["fontWeight"];

  /**
   * margin 상단을 설정합니다.
   *
   * @default 0
   */
  marginTop: number;

  /**
   * margin 우측을 설정합니다.
   *
   * @default 0
   */
  marginRight: number;

  /**
   * margin 하단을 설정합니다.
   *
   * @default 0
   */
  marginBottom: number;

  /**
   * margin 좌측을 설정합니다.
   *
   * @default 0
   */
  marginLeft: number;

  /**
   * padding 상단을 설정합니다.
   *
   * @default 0
   */
  paddingTop: number;

  /**
   * padding 우측을 설정합니다.
   *
   * @default 0
   */
  paddingRight: number;

  /**
   * padding 하단을 설정합니다.
   *
   * @default 0
   */
  paddingBottom: number;

  /**
   * padding 좌측을 설정합니다.
   *
   * @default 0
   */
  paddingLeft: number;

  /**
   * 텍스트의 투명도를 설정합니다.
   *
   * @default 1
   */
  opacity: number;

  /**
   * 텍스트의 정렬을 설정합니다.
   *
   * @default 'left'
   */
  textAlign: CSSProperties["textAlign"];
}

export interface TextProps
  extends Partial<Props>,
    Omit<
      HTMLAttributes<
        HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
      >,
      "color"
    > {}
