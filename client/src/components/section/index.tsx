import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";
import Flex from "_common/components/flex";
import Grid from "_common/components/grid";

const Section = ({
  as = "div",
  sectionType = "flex",
  variant = "default",
  width = 100,
  direction = "row",
  gridTemplateAreas = "",
  gridArea = "",
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingTop = 0,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  backgroundColor = "inherit",

  children,
  ...rest
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      <Styled.Section
        as={as}
        variant={variant}
        width={width}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        paddingTop={paddingTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        sectionType={sectionType}
        direction={direction}
        gridTemplateAreas={gridTemplateAreas}
        gridArea={gridArea}
        backgroundColor={backgroundColor}
        {...rest}
      >
        {sectionType == "flex" && <Flex direction={direction}>{children}</Flex>}
        {sectionType == "grid" && (
          <Grid gridTemplateAreas={gridTemplateAreas}>{children}</Grid>
        )}
        {sectionType == undefined && <div>{children}</div>}
      </Styled.Section>
    </>
  );
};
export default Section;
