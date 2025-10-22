import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./styles/global";
import { ThemeProvider } from "./providers/ThemeProvider";
import { RouterProvider } from "react-router";
import { appRouter } from "./app/routes";
import { AuthStoreProvider } from "./providers/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthStoreProvider>
    <ThemeProvider>
      <GlobalStyles />
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  </AuthStoreProvider>
);
