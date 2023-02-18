import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { LayoutProps } from "./index.types";
import { theme } from "styles";

export const Layout = styled.main<Required<LayoutProps>>`
  margin: auto;
  display: flex;
  width: ${({ width }) => width};
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
  ${({ variant, width, backgroundColor }) => {
    switch (variant) {
      case "default": {
        return css`
          width: 100%;
          height: 100%;
          background-color: ${theme.colors.white};
        `;
      }
      case "xs": {
        return css`
          max-width: 320px;
          background-color: ${theme.colors.indigo_50};
        `;
      }
      case "sm": {
        return css`
          max-width: 670px;
          background-color: ${theme.colors.indigo_50};
        `;
      }
      case "md": {
        return css`
          max-width: 960px;
          background-color: ${theme.colors.indigo_300};
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
      case "custom": {
        return css`
          margin: 0;
          max-width:${width}%
          background-color: ${backgroundColor};
        `;
      }
    }
  }}
`;
export const Aside = styled.aside<Required<any>>`
  width: 20%;
`;
