import React from "react";

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};
/** * @description resumes의 apply {company, department}에 대한 상태관리
 * @param initialState company(회사명), department(부서명)
 * @default company ""
 * @default department ""
 * */
export const useInputReducer = (initialState = {}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, dispatch, onChange] as const;
};
