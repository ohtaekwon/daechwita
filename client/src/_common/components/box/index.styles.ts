import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { BoxProps } from "./index.types";

export const Box = styled.div<Required<BoxProps>>`
  width: ${({ width }) => width};
  display: ${({ display }) => display};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};

  align-items: ${({ alignItems }) => alignItems};
  grid-area: ${({ gridArea }) => gridArea};
  padding: ${({ paddingTop, paddingRight, paddingBottom, paddingLeft }) =>
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  margin: ${({ marginTop, marginRight, marginBottom, marginLeft }) =>
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
`;
