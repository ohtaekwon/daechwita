import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { BoxProps } from "./index.types";

export const Box = styled.span<Required<BoxProps>>`
  /**
  * 넓이/높이 설정
  */
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  /**
  * 배치 설정
  */
  position: ${({ position }) => position};
  display: ${({ display }) => display};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  grid-area: ${({ gridArea }) => gridArea};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
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
  border-radius: ${({ radius }) => `${radius}px`};
  /**
  * 기타 옵션 설정
  */
  cursor: ${({ cursor }) => cursor};
  opacity: ${({ opacity }) => opacity};

  border-style: solid;
  box-sizing: border-box;
  ${({ variant, theme }) => {
    switch (variant) {
      case "primary": {
        /**
         * green 테두리 box, hover시 진한 green 색상
         */
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
      case "gray_200_border": {
        /**
         * gray 테두리 box, hover시 stone 색상
         */
        return css`
          border-color: ${theme.colors.gray_200};
          background-color: ${theme.colors.gray_100};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.stone_500};
            background-color: ${theme.colors.stone_500};
            color: ${theme.colors.white};
          }
        `;
      }
      case "blue_200_border": {
        /**
         * blue 테두리 box, hover시 진한 blue 색상
         */
        return css`
          border-color: ${theme.colors.blue_200};
          background-color: ${theme.colors.blue_200};
          color: ${theme.colors.white};
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.blue_500};
            background-color: ${theme.colors.blue_500};
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
