import React from "react";
import ReactDOM from "react-dom/client";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyle, theme } from "./styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import App from "./App";
import { getClient } from "queryClient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = getClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <Global styles={globalStyle} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
