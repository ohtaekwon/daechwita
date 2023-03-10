import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { InnerType, ModalType } from "./index.types";

export const Wrapper = styled.div<Required<ModalType>>`
  /**
  * 배치 설정
  */
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: flex-end;
  z-index: 99;
  /**
  * 배경/테두리 스타일 설정
  */
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
`;
export const Inner = styled.div<InnerType>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-width: ${({ width }) => width};
  max-height: ${({ height }) => height};
  overflow: scroll;
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;
`;
