import styled from "@emotion/styled";
import { SkeletonProps } from "./index.types";

export const Wrapper = styled.div<Required<SkeletonProps>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: linear-gradient(
    120deg,
    #e5e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0f0 40%,
    #e5e5e5e5 48%
  );
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);
  border-radius: 8px;
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: skeleton-loading 2s infinite;
  @keyframes skeleton-loading {
    100% {
      background-position: -100% 0;
    }
  }
`;

export const Another = styled.div`
  width: 100%;
  height: 300px;
  animation: skeleton-loading 1s linear infinite alternate;

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(0, 200%, 70%);
    }
    100% {
      background-color: hsl(0, 3%, 98%);
    }
  }
`;
