import styled from "@emotion/styled";
import { FlexProps } from "./index.types";

export const Flex = styled.span<Required<FlexProps>>`
  display: ${({ display }) => display};
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ wrap }) => wrap};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
  gap: ${({ gap }) => gap};
`;
