import React from "react";
import Header from "components/header";
import DefaultRouter from "routes/defaultRouter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <>
      <Header />
      <DefaultRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; tk {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
