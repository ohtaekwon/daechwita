import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { InputProps } from "./index.types";

export const Input = styled.input<Required<InputProps>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: ${({ position }) => position};
  display: block;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};

  align-items: ${({ alignItems }) => alignItems};
  grid-area: ${({ gridArea }) => gridArea};

  padding: ${({ paddingTop, paddingRight, paddingBottom, paddingLeft }) =>
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  margin: ${({ marginTop, marginRight, marginBottom, marginLeft }) =>
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};

  border-radius: ${({ radius }) => `${radius}px`};

  cursor: ${({ cursor }) => cursor};
  opacity: ${({ opacity }) => opacity};
`;
