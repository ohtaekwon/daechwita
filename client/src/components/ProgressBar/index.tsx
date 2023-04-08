import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const ProgressBar = ({
  backgroundColor = "inherit",
  loadingTime = 5,
  loadingText = "loading...",
}: React.PropsWithChildren<Props>) => {
  return (
    <Styled.Wrapper backgroundColor={backgroundColor}>
      <Styled.Container>
        <Styled.Text>
          <h1>{loadingText}</h1>
        </Styled.Text>
        <Styled.Loading>
          <Styled.LineBox>
            <Styled.Line loadingTime={loadingTime}></Styled.Line>
          </Styled.LineBox>
        </Styled.Loading>
      </Styled.Container>
    </Styled.Wrapper>
  );
};
export default ProgressBar;
{
  /* </Styled.Wrapper> */
}
