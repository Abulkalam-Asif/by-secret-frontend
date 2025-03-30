import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.ts";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import AlertContainer from "./components/general/AlertContainer.tsx";
import { AdminProvider } from "./contexts/AdminContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AdminProvider>
          <AlertProvider>
            <App />
            <AlertContainer />
          </AlertProvider>
        </AdminProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
