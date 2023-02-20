import styled from "@emotion/styled";
import { SectionProps } from "./index.types";

export const Section = styled.section<Required<SectionProps>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: 0 auto;
  display: ${({ display }) => display};
  flex-direction: ${({ direction }) => direction};

  grid-template-areas: ${({ gridTemplateAreas }) => gridTemplateAreas};
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
  gap: 1rem;
  overflow: auto;

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
  margin: ${({ margin, marginTop, marginRight, marginBottom, marginLeft }) =>
    margin
      ? margin
      : `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`};
  background-color: ${({ theme, backgroundColor }) =>
    theme?.colors[backgroundColor]};

  ::-webkit-scrollbar {
    display: none;
  }
`;
