import React from "react";
import Header from "components/header";
import SignInRouter from "./signInRouter";
import DefaultRouter from "./defaultRouter";
import Footer from "components/footer";

type Props = {
  isLoggedIn: Boolean;
};

const Router = ({ isLoggedIn }: Props) => {
  return (
    <>
      {isLoggedIn && <Header />}
      {isLoggedIn ? (
        <>
          <SignInRouter />
        </>
      ) : (
        <DefaultRouter />
      )}
      {/* {isLoggedIn && <Footer />} */}
    </>
  );
};
export default Router;
