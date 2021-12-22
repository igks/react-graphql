//===================================================
// Date         : 04 Nov 2021
// Author       : I Gusti Kade Sugiantara
// Description  : Application entry point
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const { REACT_APP_SERVER_DOMAIN } = process.env;
const client = new ApolloClient({
  uri: REACT_APP_SERVER_DOMAIN,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
