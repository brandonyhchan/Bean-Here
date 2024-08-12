import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
  credentials: "same-origin",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("authToken");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message.includes("Not authenticated")) {
        // Token expired, redirect to login
        window.location.href = "/login";
      }
    });
  }
});

const apolloClient = new ApolloClient({
  link: concat(authLink, concat(errorLink, httpLink)),
  cache: new InMemoryCache(),
});

export default apolloClient;
