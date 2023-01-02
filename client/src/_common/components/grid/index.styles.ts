import styled from "@emotion/styled";
import { GridProps } from "./index.types";

export const Grid = styled.div<Required<GridProps>>`
  display: ${({ display }) => display};
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
  gap: 16px;
`;
