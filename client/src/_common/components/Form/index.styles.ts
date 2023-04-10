import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FormProps } from "./index.types";

export const Form = styled.form<Required<FormProps>>`
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
  border-color: ${({ borderColor, theme }) => theme.colors[borderColor]};
  border-radius: ${({ radius }) => `${radius}px`};

  border-style: solid;
  /**
  * 기타 옵션 설정
  */
  cursor: ${({ cursor }) => cursor};
  opacity: ${({ opacity }) => opacity};
`;
