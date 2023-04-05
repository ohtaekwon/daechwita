import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { BoxProps } from "./index.types";

export const Box = styled.span<Required<BoxProps>>`
  ${({ as }) => as === "span" && `display: inline-block;`};

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
  z-index: ${({ zIndex }) => zIndex};

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
    `${theme.colors[backgroundColor]}!important`};
  background-image: ${({ backgroundImage }) => backgroundImage};

  border-radius: ${({ radius }) => `${radius}px`};
  box-shadow: ${({ boxShadow }) => boxShadow};
  border-style: solid;
  box-sizing: border-box;
  /**
  * 기타 옵션 설정
  */
  backface-visibility: ${({ backfaceVisibility }) => backfaceVisibility};
  cursor: ${({ cursor }) => cursor};
  opacity: ${({ opacity }) => opacity};
  gap: ${({ gap }) => gap};

  ::-webkit-scrollbar {
    display: none;
  }

  ${({ variant, theme, backgroundImage }) => {
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
      case "blue_200_border": {
        /**
         * blue 테두리 box, hover시 진한 blue 색상
         */
        return css`
          border: 0;
          border-color: ${theme.colors.blue_200}!important;
          background-color: ${theme.colors.blue_200}!important;
          color: ${theme.colors.white}!important;
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.blue_500};
            background-color: ${theme.colors.blue_500};
            color: ${theme.colors.white};
          }
        `;
      }
      case "gray_200_border": {
        return css`
          border-color: ${theme.colors.gray_300}!important;
          color: ${theme.colors.black}!important;
          background-color: ${theme.colors.gray_50}!important;
          box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);
        `;
      }
      case "chart_border": {
        return css`
          border-color: ${theme.colors.gray_300}!important;
          color: ${theme.colors.black}!important;
          background-color: ${theme.colors.gray_50}!important;
          box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);

          @media screen and (min-width: 320px) {
            width: 300px;
          }
          @media screen and (min-width: 420px) {
            width: 400px;
          }
          @media screen and (min-width: 520px) {
            width: 500px;
          }
          @media screen and (min-width: 620px) {
            width: 600px;
          }
          @media screen and (min-width: 720px) {
            width: 700px;
          }
          @media screen and (min-width: 820px) {
            width: 800px;
          }
          @media screen and (min-width: 920px) {
            width: 900px;
          }
          @media screen and (min-width: 1020px) {
            width: 1000px;
          }
          @media screen and (min-width: 1120px) {
            width: 1100px;
          }
          @media screen and (min-width: 1220px) {
            width: 1200px;
          }
          @media screen and (min-width: 1280px) {
            width: 100%;
          }
        `;
      }
      case "amber": {
        return css`
          border-color: ${theme.colors.amber_50}!important;
          background-color: ${theme.colors.amber_500}!important;
          color: ${theme.colors.black}!important;
          box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);
        `;
      }
      case "front": {
        return css`
          border-color: ${theme.colors.gray_300}!important;
          background-color: ${theme.colors.gray_50}!important;
          color: ${theme.colors.black};
          transition: all 1s ease-out;
          transform: rotateY(180deg);
          backface-visibility: hidden;
          box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);
        `;
      }
      case "back": {
        return css`
          transition: all ease 1s;
          backface-visibility: hidden;

          border-color: ${theme.colors.gray_300}!important;
          background-color: ${theme.colors.gray_50}!important;
          box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.37);
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
  }};
`;
