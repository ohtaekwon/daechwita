import styled from "@emotion/styled";
import { ThemeType } from "styles/index.types";
import { GridProps, GridContainerProps } from "./index.types";

export const Grid = styled.div<Required<GridProps>>`
  display: ${({ display }) => display};
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
  gap: ${({ gap }) => gap};
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
`;
