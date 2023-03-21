import React from "react";

const reducer = (state: any, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export const useInputReducer = (initialState = {}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, dispatch, onChange] as const;
};
