import styled from "@emotion/styled";
import { theme } from "styles";
import { LineProps, WrapperProps } from "./index.types";

export const Wrapper = styled.div<Required<WrapperProps>>`
  background-color: ${({ backgroundColor }) => theme.colors[backgroundColor]};
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Text = styled.div`
  color: ${theme.colors.white};
  margin-bottom: 2rem;
  font-size: 1.5rem;
  letter-spacing: 2px;
`;
export const Loading = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LineBox = styled.div`
  padding: 4px;
  width: 40%;
  border: 2px solid ${theme.colors.sky_600};
  border-radius: 20px;
`;

export const Line = styled.div<Required<LineProps>>`
  height: 20px;
  border-radius: 20px;
  background: ${theme.colors.tdgreen_300};
  animation: loading ${({ loadingTime }) => `${loadingTime}s`} forwards
    cubic-bezier(0, 0, 0, 0);
  @keyframes loading {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;
