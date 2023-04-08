import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Spinner = ({
  backgroundColor = "transparent",
  loadingTime = 0.75,
  pageLoader = false,
  individualLoader = false,
}: React.PropsWithChildren<Props>) => {
  return (
    <>
      {pageLoader && (
        <Styled.PageLoader
          backgroundColor={backgroundColor}
          loadingTime={loadingTime}
        />
      )}
      {individualLoader && (
        <Styled.Wrapper>
          <Styled.IndividualLoader />
        </Styled.Wrapper>
      )}
    </>
  );
};
export default Spinner;
