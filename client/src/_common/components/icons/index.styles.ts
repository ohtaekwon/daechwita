import styled from "@emotion/styled";
import { IconsProps } from "./index.types";

export const Icons = styled.div<Required<IconsProps>>`
  background-color: ${({ backgroundColor, theme }: any) =>
    theme.colors[backgroundColor]};
`;
