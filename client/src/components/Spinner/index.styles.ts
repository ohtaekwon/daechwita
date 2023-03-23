import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Container = styled.span`
  position: relative;
  width: 250px;
  height: 250px;
  background: #eaeaf0;
  border: 6px solid #eaeaf0;
  box-shadow: -8px -8px 15px rgba(255, 255, 255, 1),
    8px 8px 25px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 40px;
    background: #eaeaf0;
    border-radius: 50%;
    box-shadow: -8px -8px 25px rgba(255, 255, 255, 1),
      8px 8px 25px rgba(0, 0, 0, 0.25), inset 3px 3px 10px rgba(0, 0, 0, 0.1),
      inset -1px -1px 15px rgba(255, 255, 255, 1);
    border: 2px solid #eaeaf0;
    z-index: 1;
  }
`;
export const Inner = styled.i`
  position: absolute;
  inset: 0;
  background: linear-gradient(#42abff, #ff3f8b, #ffeb3b);
  border-radius: 50%;
  filter: blur(5px);
  animation: animate 1s linear infinite;

  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
