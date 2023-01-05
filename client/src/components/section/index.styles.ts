import styled from "@emotion/styled";
import { SectionProps } from "./index.types";

export const Section = styled.section<Required<SectionProps>>`
  width: ${({ width }) => `${width}%`};
  margin: 0 auto;
  padding: ${({ paddingTop, paddingRight, paddingBottom, paddingLeft }) =>
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  margin: ${({ marginTop, marginRight, marginBottom, marginLeft }) =>
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
`;
