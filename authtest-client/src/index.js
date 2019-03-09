import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

const client = new ApolloClient({
  uri: "/graphql",
  request: (operation) => {
    const token = localStorage.getItem("token");
    if (token) {
      operation.setContext({ headers: {
        Authorization: `Bearer ${token}` 
      }});  
    }
  }
});

const app = (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'));

