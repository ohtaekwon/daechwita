import type { CSSProperties, ElementType, HTMLAttributes } from "react";

import theme from "styles/theme";

export interface TextareaProps {
  /**
   * TextArea의 폰트 사이즈를 설정합니다.
   *
   * @default 'regular'
   */
  fontSize: keyof typeof theme.fontSize;

  /**
   * TextArea의 폰트 색상을 설정합니다.
   *
   * @default 'zinc_700'
   */
  color: keyof typeof theme.colors;

  /**
   * TextArea의 폰트 두께를 설정합니다.
   *
   * @default 400
   */
  fontWeight?: CSSProperties["fontWeight"];
  /**
   * TextArea의 bottom 속성을 설정합니다.
   *
   * @default inherit
   */
  margin?: CSSProperties["margin"];
  /**
   * TextArea의 margin 상단을 설정합니다.
   *
   * @default 0
   */
  marginTop?: number;

  /**
   * TextArea의 margin 우측을 설정합니다.
   *
   * @default 0
   */
  marginRight?: number;

  /**
   * TextArea의 margin 하단을 설정합니다.
   *
   * @default 0
   */
  marginBottom?: number;

  /**
   * TextArea의 margin 좌측을 설정합니다.
   *
   * @default 0
   */
  marginLeft?: number;

  /**
   * TextArea의 padding 상단을 설정합니다.
   *
   * @default 0
   */
  paddingTop?: number;

  /**
   * TextArea의 padding 우측을 설정합니다.
   *
   * @default 0
   */
  paddingRight?: number;

  /**
   * TextArea의 padding 하단을 설정합니다.
   *
   * @default 0
   */
  paddingBottom?: number;

  /**
   * TextArea의 padding 좌측을 설정합니다.
   *
   * @default 0
   */
  paddingLeft?: number;

  /**
   * TextArea의 텍스트의 투명도를 설정합니다.
   *
   * @default 1
   */
  opacity?: number;

  /**
   * TextArea의 텍스트의 정렬을 설정합니다.
   *
   * @default 'left'
   */
  textAlign?: CSSProperties["textAlign"];

  /**
   * TextArea의 텍스트의 글 간격을 설정합니다.
   *
   * @default 'auto'
   */

  letterSpacing?: CSSProperties["letterSpacing"];

  /**
   * TextArea의 width 속성을 설정합니다.
   *
   * @default inherit
   */
  width?: CSSProperties["width"];
  /**
   * TextArea의 bottom 속성을 설정합니다.
   *
   * @default inherit
   */
  height?: CSSProperties["height"];

  /**
   * TextArea 의 배경 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  backgroundColor?: keyof typeof theme.colors;

  /**
   * TextArea 의 border 색상을 설정합니다.
   *
   * @default 'inherit'
   */

  borderColor?: keyof typeof theme.colors;
  /**
   * TextArea 의 box Shadow 색상을 설정합니다.
   *
   * @default 'inherit'
   */
  boxShadow?: CSSProperties["boxShadow"];
  /**
   * Box의 radius 설정합니다.
   *
   * @default 8
   */
  radius?: number;
}
export interface Props
  extends Partial<TextareaProps>,
    Omit<
      HTMLAttributes<
        HTMLHeadingElement | HTMLParagraphElement | HTMLTextAreaElement
      >,
      "color"
    > {
  /**
   * TextArea의 value 속성을 설정합니다.
   *
   * @default '''
   */
  value?: string | number;

  /**
   * TextArea의 name 속성을 설정합니다.
   *
   * @default '''
   */
  name?: string;
}
