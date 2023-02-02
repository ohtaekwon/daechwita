import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { LayoutProps } from "./index.types";

export const Layout = styled.main<Required<LayoutProps>>`
  margin: auto;

  ${({ variant }) => {
    switch (variant) {
      case "default": {
        return css`
          max-width: 100%;
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
export const Aside = styled.aside<Required<any>>`
  width: 20%;
`;
