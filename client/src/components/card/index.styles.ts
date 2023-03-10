import styled from "@emotion/styled";
import { CardProps } from "./index.types";

export const Wrapper = styled.span<Required<CardProps>>`
  position: relative;
  width: 100%;
  height: 420px;
  margin: "auto";
  cursor: pointer;
  box-sizing: border-box;
`;
