import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Section = React.forwardRef(function Section(
  {
    /**
     * HTML태그 설정
     */
    as = "section",
    className,
    /**
     * 넓이/높이 설정
     */
    width = "auto",
    height = "auto",
    /**
     * 배치 설정
     */
    display = "block",
    // flex
    direction = "row",
    // grid
    gridTemplateAreas = "",
    gridTemplateColumns = "",
    gridTemplateRows = "auto",
    gridArea = "none",
    /**
     * padding 설정
     */
    padding = "16px",
    paddingBottom = 0,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    /**
     * margin 설정
     */
    margin = "inherit",
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    /**
     * 배경/테두리 스타일 설정
     */
    backgroundColor = "inherit",
    pageTitle,
    children,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <>
      <Styled.Section
        /**
         * HTML태그 설정
         */
        as={as}
        className={className}
        /**
         * 넓이/높이 설정
         */
        height={height}
        width={width}
        /**
         * 배치 설정
         */
        display={display}
        // Flex 설정
        direction={direction}
        // Grid 설정
        gridTemplateAreas={gridTemplateAreas}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        gridArea={gridArea}
        /**
         * padding 설정
         */
        padding={padding}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        paddingTop={paddingTop}
        /**
         * margin 설정
         */
        margin={margin}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        /**
         * 배경/테두리 스타일 설정
         */
        backgroundColor={backgroundColor}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </Styled.Section>
    </>
  );
});
export default Section;
