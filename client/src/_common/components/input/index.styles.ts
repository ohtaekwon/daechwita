import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { InputProps } from "./index.types";

export const Input = styled.input<Required<InputProps>>`
  /**
  * 넓이/높이 설정
  */
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  /**
  * 배치 설정
  */
  display: ${({ display }) => display};
  position: ${({ position }) => position};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  grid-area: ${({ gridArea }) => gridArea};
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
  border-color: ${({ borderColor, theme }) =>
    `${theme.colors[borderColor]}!important`};
  border-radius: ${({ radius }) => `${radius}px`};
  border-style: solid;
  border-width: 1px;
  box-shadow: ${({ boxShadow }) => boxShadow};

  padding-inline-start: 1rem;

  /* border-width: inherit; */

  /**
  * 기타 옵션 설정
  */
  cursor: ${({ cursor }) => cursor};
  opacity: ${({ opacity }) => opacity};
  color: ${({ color }) => color};

  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  ::placeholder {
    color: ${({ color }) => color};
  }

  ${({ type }) => {
    switch (type) {
      case "file": {
        return css`
          position: absolute;
          right: 0;
          width: 0;
          height: 0;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        `;
      }
      default: {
        return css``;
      }
    }
  }}

  ${({ variant, theme }) => {
    switch (variant) {
      case "search_1": {
        return css`
          border: 0;
          background-color: ${theme.colors.white};
          color: ${theme.colors.white};
          font-size: 2rem;
          transition: background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, color 0.15s ease-in-out;
          &:hover {
            border-color: ${theme.colors.zinc_500};
            background-color: ${theme.colors.zinc_200};
            color: ${theme.colors.black};
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
