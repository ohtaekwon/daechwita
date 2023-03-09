import styled from "@emotion/styled";
import { SectionProps } from "./index.types";

export const Section = styled.section<Required<SectionProps>>`
  /**
  * 넓이/높이 설정
  */
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  /**
  * 배치 설정
  */
  display: ${({ display }) => display};
  /**
  * 배치 설정 Flex
  */
  flex-direction: ${({ direction }) => direction};
  /**
  * 배치 설정 Grid
  */
  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
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
    padding
      ? padding
      : `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`};
  /**
  * margin 설정
  */
  margin: ${({ margin, marginTop, marginRight, marginBottom, marginLeft }) =>
    margin
      ? margin
      : `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
  /**
  * 배경/테두리 스타일 설정
  */
  background-color: ${({ theme, backgroundColor }) =>
    theme?.colors[backgroundColor]};
  background-image: ${({ backgroundImage }) => backgroundImage};
  /* gap: 1rem; */
  /* ::-webkit-scrollbar {
    display: none;
  } */
`;
