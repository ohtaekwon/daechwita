import styled from "@emotion/styled";
import { ColumnProps } from "./index.types";

export const Wrapper = styled.div<Required<ColumnProps>>`
  width: "100%";
  height: "100%";
  display: "flex";
  direction: "column";
  justify-content: "center";
  align-items: center;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.zinc_200}; */
  /* background-color: ${({ theme }) => theme.colors.white}; */
`;
