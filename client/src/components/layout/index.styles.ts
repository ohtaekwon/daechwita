import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { LayoutProps } from "./index.types";

export const Main = styled.main<Required<LayoutProps>>`
  margin: auto;
  flex-direction: ${({ direction }) => direction};
  ${({ variant }) => {
    switch (variant) {
      case "default": {
        return css`
          max-width: 1080px;
        `;
      }
      case "sm": {
        return css`
          max-width: 670px;
        `;
      }
      case "md": {
        return css`
          max-width: 960px;
        `;
      }
      case "lg": {
        return css`
          max-width: 1280px;
        `;
      }
      case "xl": {
        return css`
          max-width: 1600px;
        `;
      }
    }
  }}
`;
