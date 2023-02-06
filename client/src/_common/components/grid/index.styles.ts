import styled from "@emotion/styled";
import { GridProps, GridContainerProps } from "./index.types";

export const Grid = styled.span<Required<GridProps>>`
  display: ${({ display }) => display};
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
  gap: ${({ gap }) => gap};
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
`;
