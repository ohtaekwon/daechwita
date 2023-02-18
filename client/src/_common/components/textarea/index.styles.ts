import styled from "@emotion/styled";
import { TextareaProps } from "./index.types";

export const TextArea = styled.textarea<Required<TextareaProps>>`
  width: ${({ width }) => width};
  height: ${({ height }) => `${height}px`};
  margin: ${({ margin }) => margin};
  padding: ${({ paddingTop, paddingRight, paddingBottom, paddingLeft }) =>
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  margin: ${({ marginTop, marginRight, marginBottom, marginLeft }) =>
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${({ fontSize, theme }) => theme.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => fontWeight};
  opacity: ${({ opacity }) => opacity};
  text-align: ${({ textAlign }) => textAlign};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  box-sizing: border-box;
`;
