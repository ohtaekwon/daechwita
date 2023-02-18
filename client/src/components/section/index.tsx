import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Section = React.forwardRef(function Section(
  {
    as = "section",
    children,
    className,
    width = "auto",
    height = "auto",
    display = "inline",
    direction = "row",
    gridTemplateAreas = "",
    gridTemplateColumns = "",
    gridTemplateRows = "auto",
    gridArea = "none",
    padding = "16px",
    paddingBottom = 0,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    margin = "inherit",
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    backgroundColor = "inherit",
    pageTitle,
    ...rest
  }: React.PropsWithChildren<Props>,
  forwardedRef: React.Ref<HTMLElement>
) {
  return (
    <>
      <Styled.Section
        as={as}
        className={className}
        display={display}
        direction={direction}
        height={height}
        width={width}
        gridTemplateAreas={gridTemplateAreas}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        gridArea={gridArea}
        backgroundColor={backgroundColor}
        padding={padding}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        paddingTop={paddingTop}
        margin={margin}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </Styled.Section>
    </>
  );
});
export default Section;

{
  /* {sectionType === "flex" && (
          <Flex direction={direction}>{children}</Flex>
        )}
        {sectionType === "grid" && (
          <Grid
            gridTemplateAreas={gridTemplateAreas}
            gridTemplateColumns={gridTemplateColumns}
            gridTemplateRows={gridTemplateRows}
          >
            {children}
          </Grid>
        )}
        {!sectionType && <>{children}</>} */
}
