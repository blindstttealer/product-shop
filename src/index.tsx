import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "./context/ThemeContext";
import { RouterProvider } from "react-router";
import { appRouter } from "./app/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <ThemeProvider>
    <GlobalStyles />
    <RouterProvider router={appRouter} />
  </ThemeProvider>,
);
