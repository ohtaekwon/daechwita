import { css } from "@emotion/react";
import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Flex = React.forwardRef(function Flex(
  {
    /** @description HTML태그 설정*/
    as = "div",
    /** @description 넓이/높이 설정 */
    width = "auto",
    height = "auto",
    /** @description 배치 설정*/
    display = "flex",
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    alignContent = "normal",
    wrap = "nowrap",
    /** @description 배경/테두리 스타일 설정 */
    backgroundColor = "inherit",
    /** @description 간격 설정 */
    gap = 0,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <Styled.Flex
      /** @description HTML태그 설정 */
      as={as}
      /** @description 넓이/높이 설정 */
      width={width}
      height={height}
      /** @description 배치 설정 */
      display={display}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      alignContent={alignContent}
      wrap={wrap}
      /** @description 배경/테두리 스타일 설정 */
      backgroundColor={backgroundColor}
      /** @description 간격 설정*/
      gap={gap}
      /** @description ref 설정 */
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Styled.Flex>
  );
});

export default Flex;
