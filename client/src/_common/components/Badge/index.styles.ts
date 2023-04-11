import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { BadgeProps } from "./index.types";

export const Badge = styled.span<Required<BadgeProps>>`
  /**
  * 넓이/높이 설정
  */
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  /**
  * 배치 설정
  */
  position: ${({ position }) => position};
  /**
  * padding 설정
  */
  padding: ${({
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  }) =>
    padding ||
    `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  /**
  * margin 설정
  */
  margin: ${({ margin, marginTop, marginRight, marginBottom, marginLeft }) =>
    margin ||
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};

  /**
  * 배경/테두리 스타일 설정
  */
  background-color: ${({ backgroundColor, theme }) =>
    theme.colors[backgroundColor]};
  /**
  * 기타 옵션 설정
  */
  cursor: ${({ cursor }) => cursor};

  ${({ variant, theme }) => {
    switch (variant) {
      case "primary": {
        return css`
          border-color: ${theme.colors.tdgreen_400};
          background-color: ${theme.colors.tdgreen_400};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.tdgreen_500};
            background-color: ${theme.colors.tdgreen_500};
            color: ${theme.colors.white};
          }
        `;
      }
      case "gray": {
        return css`
          border-color: ${theme.colors.gray_300};
          background-color: ${theme.colors.gray_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.gray_700};
            background-color: ${theme.colors.gray_700};
            color: ${theme.colors.white};
          }
        `;
      }
      case "red": {
        return css`
          border-color: ${theme.colors.red_300};
          background-color: ${theme.colors.red_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.red_700};
            background-color: ${theme.colors.red_700};
            color: ${theme.colors.white};
          }
        `;
      }
      case "green": {
        return css`
          border-color: ${theme.colors.tdgreen_400};
          background-color: ${theme.colors.tdgreen_400};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.tdgreen_500};
            background-color: ${theme.colors.tdgreen_500};
            color: ${theme.colors.white};
          }
        `;
      }
      case "blue": {
        return css`
          border-color: ${theme.colors.blue_300};
          background-color: ${theme.colors.blue_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.blue_700};
            background-color: ${theme.colors.blue_700};
            color: ${theme.colors.white};
          }
        `;
      }
      case "yellow": {
        return css`
          border-color: ${theme.colors.yellow_300};
          background-color: ${theme.colors.yellow_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.yellow_700};
            background-color: ${theme.colors.yellow_700};
            color: ${theme.colors.white};
          }
        `;
      }
      case "purple": {
        return css`
          border-color: ${theme.colors.purple_300};
          background-color: ${theme.colors.purple_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.purple_700};
            background-color: ${theme.colors.purple_700};
            color: ${theme.colors.white};
          }
        `;
      }
      case "sky": {
        return css`
          border-color: ${theme.colors.sky_300};
          background-color: ${theme.colors.sky_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.sky_700};
            background-color: ${theme.colors.sky_700};
            color: ${theme.colors.white};
          }
        `;
      }
      case "indigo": {
        return css`
          border-color: ${theme.colors.indigo_300};
          background-color: ${theme.colors.indigo_300};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.indigo_700};
            background-color: ${theme.colors.indigo_700};
            color: ${theme.colors.white};
          }
        `;
      }

      default: {
        return css`
          border-color: ${theme.colors.transparent};
          background-color: ${theme.colors.transparent};
          color: ${theme.colors.blackText_1_fill};
          transition: border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.transparent};
            color: ${theme.colors.blackText_1_fill};
          }
        `;
      }
    }
  }}
`;
