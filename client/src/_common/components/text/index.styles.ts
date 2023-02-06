import styled from "@emotion/styled";

import { Props, TextProps } from "./index.types";

export const Text = styled.span<Required<TextProps>>`
  padding: ${({ paddingTop, paddingRight, paddingBottom, paddingLeft }) =>
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  margin: ${({ marginTop, marginRight, marginBottom, marginLeft }) =>
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${({ fontSize, theme }) => theme.fontSize[fontSize]};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ lineHeight, theme }) => theme.lineHeight[lineHeight]};
  opacity: ${({ opacity }) => opacity};
  text-align: ${({ textAlign }) => textAlign};
  ${({ as }) => as === "span" && `display: inline-block;`}
`;
