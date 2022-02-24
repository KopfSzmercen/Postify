import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GetUsersResult } from "./generated";
import reportWebVitals from "./reportWebVitals";
import theme from "./utils/theme";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getUsers: {
          keyArgs: false,
          merge(
            existing: GetUsersResult,
            incoming: GetUsersResult,
            { readField }
          ) {
            const existingUsers = existing ? existing.users : [];
            const res: GetUsersResult = {
              success: incoming.success,
              hasMore: incoming.hasMore,
              users: [...existingUsers, ...incoming.users]
            };
            //console.log(res);
            return res;
            // const existingUsers = existing ? existing.users : [];
            // const merged: any[] = existingUsers ? existingUsers.slice(0) : [];

            // const existingIdSet = new Set(
            //   merged.map((user) => readField("id", user))
            // );

            // const incomingUsers = incoming.users.filter((user) => {
            //   if (!existingIdSet.has(readField("id", user))) return user;
            // });

            // incomingUsers.forEach((u) => merged.push(u));

            // const res: GetUsersResult = {
            //   success: incoming.success,
            //   hasMore: incoming.hasMore,
            //   users: [...merged]
            // };

            // return res;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
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
