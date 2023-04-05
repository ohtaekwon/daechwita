import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Grid = React.forwardRef(function Grid(
  {
    /** @description 엘리먼트의 타입 설정 */
    as = "div",
    /** @description Grid 설정 */
    display = "grid",
    gridTemplateAreas = "inherit",
    gridTemplateColumns = "inherit",
    gridTemplateRows = "auto",
    /** @description 배치 설정 */
    margin = 0,
    padding = 0,
    placeItems = "inherit",
    /** @description 배경/테두리 스타일 설정 */
    backgroundColor = "inherit",
    /** @description 기타 옵션 설정 */
    children,
    gap = 0,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLDivElement>
) {
  return (
    <Styled.Grid
      as={as}
      /** @description Grid 설정 */
      display={display}
      gridTemplateAreas={gridTemplateAreas}
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateRows={gridTemplateRows}
      /** @description 배치 설정 */
      margin={margin}
      padding={padding}
      placeItems={placeItems}
      /** @description 배경/테두리 스타일 설정  */
      backgroundColor={backgroundColor}
      /** @description 기타 옵션 설정 */
      gap={gap}
      /** @description ref 설정  */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Grid>
  );
});

export default Grid;
