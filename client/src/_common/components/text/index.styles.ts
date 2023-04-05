import styled from "@emotion/styled";
import { TextProps } from "./index.types";

export const Text = styled.span<Required<TextProps>>`
  ${({ as }) => as === "span" && `display: inline-block;`}
  /**
   * font 스타일 설정
  */
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${({ fontSize, theme }) => theme.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ lineHeight, theme }) => theme.lineHeight[lineHeight]};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  /**
  * padding 설정
  */
  padding: ${({ paddingTop, paddingRight, paddingBottom, paddingLeft }) =>
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  /**
  * margin 설정
  */
  margin: ${({ marginTop, marginRight, marginBottom, marginLeft }) =>
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
  /**
  * 배치 설정
  */
  text-align: ${({ textAlign }) => textAlign};
  /**
  * 기타 옵션 설정정
   */
  opacity: ${({ opacity }) => opacity};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${({ whiteSpace }) => whiteSpace};
`;
