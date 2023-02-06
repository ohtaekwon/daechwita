import React from "react";
import ReactDOM from "react-dom/client";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyle, theme } from "./styles";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        <Global styles={globalStyle} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
