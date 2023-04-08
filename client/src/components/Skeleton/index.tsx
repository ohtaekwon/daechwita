import React from "react";
import * as Styled from "./index.styles";
import { Props } from "./index.types";

const Skeleton = ({
  width = "auto",
  height = "auto",
}: React.PropsWithChildren<Props>) => {
  return <Styled.Wrapper width={width} height={height}></Styled.Wrapper>;
};
export default Skeleton;
