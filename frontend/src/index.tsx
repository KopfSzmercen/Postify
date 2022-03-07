import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  makeVar
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GetPaginatedPostsResult, GetUsersResult } from "./generated";
import reportWebVitals from "./reportWebVitals";
import theme from "./utils/theme";

export const myUsernameVar = makeVar("");

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getUsers: {
          keyArgs: false,
          merge(existing: GetUsersResult, incoming: GetUsersResult) {
            const existingUsers = existing ? existing.users : [];

            const res: GetUsersResult = {
              success: incoming.success,
              hasMore: incoming.hasMore,
              users: [...existingUsers, ...incoming.users]
            };
            return res;
          }
        },
        getPaginatedPosts: {
          keyArgs: false,
          merge(
            existing: GetPaginatedPostsResult,
            incoming: GetPaginatedPostsResult
          ) {
            const existingPosts = existing ? existing.posts : [];
            const errors = incoming.errors ? [...incoming.errors] : [];
            const res: GetPaginatedPostsResult = {
              success: incoming.success,
              hasMore: incoming.hasMore,
              posts: [...existingPosts, ...incoming.posts],
              errors: [...errors]
            };
            return res;
          }
        },
        myUsername: {
          read() {
            return myUsernameVar();
          }
        }
      }
    }
  }
});

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
  credentials: "include"
});

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ChakraProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
