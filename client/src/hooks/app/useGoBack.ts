import React from "react";
import { useNavigate } from "react-router-dom";

type Option = {
  route: string;
  replace: boolean;
};

function useGoBack(options?: Option, callback?: any) {
  const navigate = useNavigate();
  const [modalShow, toggleModal] = React.useState(false);

  const cancel = () => {
    toggleModal(false);
  };

  const handleGoBackAction = async () => {
    await navigate(options?.route || "/", {
      replace: false,
    });

    await callback();
  };

  return {
    modalShow,
    toggleModal,
    cancel,
    handleGoBackAction,
  };
}
export default useGoBack;
