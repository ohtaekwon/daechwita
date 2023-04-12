import styled from "@emotion/styled";
import { GridProps } from "./index.types";

export const Grid = styled.div<Required<GridProps>>`
  /**
  * 넓이/높이 설정
  */

  /**
  * Grid 설정 
  */
  display: ${({ display }) => display};
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
  gap: ${({ gap }) => gap};
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
  grid-gap: 1rem;
  /**
  * 배치 설정
  */
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  place-items: ${({ placeItems }) => placeItems};
  /**
  * 배경/테두리 스타일 설정
  */
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};

  box-sizing: border-box;
`;
