import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { LayoutProps } from "./index.types";

export const Layout = styled.main<Required<LayoutProps>>`
  /* display: flex;
  flex-direction: column; */
  /* background-repeat: repeat-y; */
  /* background-size: cover; */
  margin: auto;
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
  background: ${({ background }) => background};
  position: relative;
  z-index: 1;
  background-size: 100% 100%;

  ${({ variant, theme, background }) => {
    switch (variant) {
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
          height: 100%;
          max-height: max-content;
        `;
      }
      case "amber_lg": {
        return css`
          max-width: 1280px;
          height: 100%;
          max-height: max-content;
          background-color: linear-gradient(
            -90deg,
            rgb(118, 84, 219, 0.5) 0%,
            rgb(98, 136, 252, 0.8) 100%
          ) !important;
        `;
      }
      case "xl": {
        return css`
          max-width: 1600px;
          height: 100%;
          max-height: max-content;
          background-color: ${theme.colors.gray_50};
        `;
      }
      case "xxl_gray": {
        return css`
          max-width: 1600px;
          height: 100%;
          max-height: max-content;
          background-color: ${theme.colors.gray_50};
        `;
      }

      case "write": {
        return css`
          width: 100%;
          height: 100%;
          max-height: max-content;
          background-color: rgba(255, 255, 255, 0.5);

          ::before {
            width: 100%;
            height: 100%;
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: -1;
            background-color: rgba(0, 0, 0, 0.3);
          }
        `;
      }
      default: {
        return css`
          width: 100%;
          height: 100%;
        `;
      }
    }
  }}
`;
