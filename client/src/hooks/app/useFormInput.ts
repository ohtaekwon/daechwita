import React from "react";
import { useEffect } from "react";

const reducer = (state: any, action: any) => {
  console.log("state", state, "action", action);
  return {
    ...state,
    [action.name]: action.value,
  };
};

export const useUserFormInput = (initialState = {}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };

  return [state, onChange];
};
