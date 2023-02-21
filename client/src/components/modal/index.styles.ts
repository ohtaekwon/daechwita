import styled from "@emotion/styled";
import { ModalType } from "./index.types";

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
export const Inner = styled.div`
  /**
  * 넓이/높이 설정
  */
  width: 50%;
  height: 50%;
  /**
  * 배치 설정
  */
  margin: auto;
  top: 0;
  z-index: 999;
  /**
  * 배경/테두리 스타일 설정
  */
  background-color: #fff;
`;
export const Content = styled.div`
  /**
  * 배치 설정
  */
  display: flex;
  flex-direction: column;
  /**
  * 간격 설정
  */
  column-gap: 2rem;
`;
