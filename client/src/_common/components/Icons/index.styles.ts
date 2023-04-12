import styled from "@emotion/styled";
import { IconsProps } from "./index.types";

export const Icons = styled.span<Required<IconsProps>>`
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
`;
