import type { CSSProperties, ElementType, HTMLAttributes } from "react";

import theme from "styles/theme";

export interface TextProps {
  /**
   * 엘리먼트의 타입을 설정합니다.
   * @default span
   */
  as: ElementType;

  /**
   * Text의 폰트 사이즈를 설정합니다.
   * @default 'regular'
   */
  fontSize: keyof typeof theme.fontSize;

  /**
   * Text의 폰트 높이를 설정합니다.
   * @default 'regular'
   */
  lineHeight: keyof typeof theme.lineHeight;

  /**
   * Text의 색상을 설정합니다.
   * @default 'zinc_700'
   */
  color: keyof typeof theme.colors;

  /**
   * Text의 폰트 두께를 설정합니다.
   * @default 400
   */
  fontWeight: CSSProperties["fontWeight"];

  /**
   * Text의 margin 상단을 설정합니다.
   * @default 0
   */
  marginTop: number;

  /**
   * Text의 margin 우측을 설정합니다.
   * @default 0
   */
  marginRight: number;

  /**
   * Text의 margin 하단을 설정합니다.
   * @default 0
   */
  marginBottom: number;

  /**
   * Text의 margin 좌측을 설정합니다.
   * @default 0
   */
  marginLeft: number;

  /**
   * Text의 padding 상단을 설정합니다.
   * @default 0
   */
  paddingTop: number;

  /**
   * Text의 padding 우측을 설정합니다.
   * @default 0
   */
  paddingRight: number;

  /**
   * Text의 padding 하단을 설정합니다.
   * @default 0
   */
  paddingBottom: number;

  /**
   * Text의 padding 좌측을 설정합니다.
   * @default 0
   */
  paddingLeft: number;

  /**
   * Text의 투명도를 설정합니다.
   * @default 1
   */
  opacity: number;

  /**
   * Text의 정렬을 설정합니다.
   * @default 'left'
   */
  textAlign: CSSProperties["textAlign"];

  /**
   * Text의 글 간격을 설정합니다.
   * @default 'auto'
   */
  letterSpacing?: CSSProperties["letterSpacing"];

  /**
   * Text의 여백을 설정합니다.
   * @default ' normal;
   */
  whiteSpace?: CSSProperties["whiteSpace"];
}

export interface Props
  extends Partial<TextProps>,
    Omit<
      HTMLAttributes<
        HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
      >,
      "color"
    > {}
