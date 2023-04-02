import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 600px;
  height: 200px;

  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;

export const bodyStyle = css`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  /* background: #f2f2f2; */
  background: -webkit-linear-gradient(left, #a445b2, #fa4299);
`;
export const formStyle = css`
  width: 50%;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
export const titleStyle = css`
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
export const fieldStyle = css`
  height: 50px;
  width: 100%;
  margin-top: 20px;
`;
export const inputStyle = css`
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  transition: all 0.4s ease;
  :focus {
    border-color: #fc83bb;
  }
`;
export const anchorStyle = css`
  color: #fa4299;
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`;

export const submitStyle = css`
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  background: -webkit-linear-gradient(left, #a445b2, #fa4299);
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0;
  border: 0;
  cursor: pointer;
`;
