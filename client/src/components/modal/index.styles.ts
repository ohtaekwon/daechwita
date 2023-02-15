import styled from "@emotion/styled";
import { ModalType } from "./index.types";

export const Wrapper = styled.div<Required<ModalType>>`
  display: ${({ show }) => (show ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  justify-content: flex-end;
  z-index: 99;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
`;
export const Inner = styled.div`
  background-color: #fff;
  top: 0;
  width: 50%;
  height: 50%;
  background-color: #fff;
  z-index: 999;
  margin: auto;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 2rem;
`;
