import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "./auth/snackbarContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./auth/authContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
