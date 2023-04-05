import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const Inner = styled.div`
  position: relative;

  display: flex;
`;

export const MovingImage_A = styled.img<{ variant?: number }>`
  top: 100px;
  animation: Atype 15s infinite alternate;
  animation-duration: ${({ variant }) => css`calc(125s / ${variant})`};
  @keyframes Atype {
    from {
      transform: translate(100px, 100vh) scale(1);
    }
    to {
      transform: translate(100vw, 0) scale(0);
    }
  }
`;

export const MovingImage_B = styled.img<{ variant?: number }>`
  animation: Btype 15s linear infinite;
  animation-duration: ${({ variant }) => css`calc(125s / ${variant})`};
  cursor: pointer;

  @keyframes Btype {
    from {
      transform: translate(0, 0) scale(1);
    }
    to {
      transform: translate(90vw, 90vh) scale(0);
    }
  }
`;

export const MovingImage_C = styled.img<{ variant?: number }>`
  transform: translate(-50%, -30%);
  animation: Ctype 15s linear infinite;
  animation-duration: ${({ variant }) => css`calc(125s / ${variant})`};
  cursor: pointer;
  @keyframes Ctype {
    from {
      transform: translate(-150px, 0) scale(1);
    }
    to {
      transform: translate(80vw, 89vh) scale(0);
    }
  }
`;

export const SmallPlanet_A = styled.img<{ variant?: number }>`
  animation: Atype 15s linear infinite;
  animation-duration: ${({ variant }) => css`calc(125s / ${variant})`};

  width: 100px;
  height: 100px;
  @keyframes Atype {
    0% {
      transform: translateY(100vh) scale(0);
    }
    100% {
      transform: translateY(-10vh) scale(1);
    }
  }
`;

export const SmallPlanet_B = styled.img<{ variant?: number }>`
  animation: Btype 15s linear infinite;
  animation-duration: ${({ variant }) => css`calc(125s / ${variant})`};

  width: 100px;
  height: 100px;
  @keyframes Btype {
    from {
      transform: translate(0, 0) scale(0);
    }
    to {
      transform: translate(100vw, 100vh) scale(1);
    }
  }
`;
export const SmallPlanet_C = styled.img<{ variant?: number }>`
  animation: Ctype 15s linear infinite;
  animation-duration: ${({ variant }) => css`calc(125s / ${variant})`};

  width: 100px;
  height: 100px;
  @keyframes Ctype {
    from {
      transform: translate(0, 100vh) scale(0);
    }
    to {
      transform: translate(100vw, 0) scale(1);
    }
  }
`;

export const Planet = styled.img<{ variant: number }>`
  top: 450px;
  position: absolute;
  animation: motion 0.3s linear infinite alternate;
  animation-duration: ${({ variant }) => css`calc(250s / ${variant})`};

  margin-top: 0;
  @keyframes motion {
    0% {
      margin-top: 0px;
    }
    100% {
      margin-top: 20px;
    }
  }
`;
