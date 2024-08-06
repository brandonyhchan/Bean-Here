import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./apolloClient";

const container = document.getElementById("root");
if (container === null) throw new Error("Root container missing in index.html");
const root = createRoot(container);

root.render(
  <ApolloProvider client={apolloClient}>
    <React.StrictMode>
      <HelmetProvider>
        <Router>
          <App />
        </Router>
      </HelmetProvider>
    </React.StrictMode>
  </ApolloProvider>
);
