import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyle, theme } from "./styles";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
        <Global styles={globalStyle} />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
