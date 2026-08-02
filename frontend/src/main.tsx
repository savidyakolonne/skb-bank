import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./App.css";

import { AsgardeoProvider } from "@asgardeo/react";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AsgardeoProvider
      clientId="_NY7WeJGxDUIxs3fQRMsrIFqNCMa"
      baseUrl="https://api.asgardeo.io/t/inlax"
      signInRedirectURL={window.location.origin}
      signOutRedirectURL={window.location.origin + "/login"}
    >
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </AsgardeoProvider>
  </React.StrictMode>
);