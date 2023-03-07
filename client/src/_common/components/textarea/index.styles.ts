import styled from "@emotion/styled";
import { TextareaProps } from "./index.types";

export const TextArea = styled.textarea<Required<TextareaProps>>`
  /**
  * 넓이/높이 설정
  */
  width: ${({ width }) => width};
  height: ${({ height }) => `${height}px`};
  /**
  * font 스타일 설정
  */
  color: ${({ theme, color }) => theme.colors[color]};
  ::placeholder {
    color: ${({ color }) => color};
  }
  font-size: ${({ fontSize, theme }) => theme.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-align: ${({ textAlign }) => textAlign};
  /**
  * 배치 설정 (글자)
  */
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  /**
  * padding 설정
  */
  padding: ${({ paddingTop, paddingRight, paddingBottom, paddingLeft }) =>
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  /**
  * margin 설정
  */
  margin: ${({ margin, marginTop, marginRight, marginBottom, marginLeft }) =>
    margin ||
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};

  /**
  * 배경/테두리 스타일 설정
  */
  background-color: ${({ backgroundColor, theme }) =>
    `${theme.colors[backgroundColor]}!important`};
  border-color: ${({ borderColor, theme }) =>
    `${theme.colors[borderColor]}!important`};
  border-radius: ${({ radius }) => `${radius}px`};
  border-style: solid;
  border-width: 1px;
  box-shadow: ${({ boxShadow }) => boxShadow};
  /**
  * 기타 옵션 설정정
  */
  opacity: ${({ opacity }) => opacity};

  box-sizing: border-box;
`;
