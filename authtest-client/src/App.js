import React, { useState } from "react";
import { useMutation, useApolloClient } from "react-apollo-hooks";
import gql from "graphql-tag";

const authenticationMutation = gql`
  mutation ($id: String!) {
    authenticate(id: $id)
  }
`;

const queryOne = gql`
  query {
    queryOne
  }
`;

const queryTwo = gql`
  query {
    queryTwo
  }
`;

const queryThree = gql`
  query {
    queryThree
  }
`;


export default function App() {
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [resultOne, setResultOne] = useState("");
  const [resultTwo, setResultTwo] = useState("");
  const [resultThree, setResultThree] = useState("");
  const authMutation = useMutation(authenticationMutation);
  const apolloClient = useApolloClient();

  async function authenticate() {
    const result = await authMutation({variables: {id: "test"}});
    console.log(result);
    if (result.data.authenticate) {
      await localStorage.setItem("token", result.data.authenticate);
      setIsTokenPresent(true);
    }
  }

  async function executeQueryOne() {
    try {
      const result = await apolloClient.query({query: queryOne, fetchPolicy: "no-cache"});
      if (result.data) {
        setResultOne(result.data.queryOne);
      }  
    } catch(error) {
      setResultOne(error.message);      
    }
  }

  async function executeQueryTwo() {
    try {
      const result = await apolloClient.query({query: queryTwo, fetchPolicy: "no-cache"});
      if (result.data) {
        setResultTwo(result.data.queryTwo);
      }  
    } catch(error) {
      setResultTwo(error.message);
    }
  }

  async function executeQueryThree() {
    try {
      const result = await apolloClient.query({query: queryThree, fetchPolicy: "no-cache"});
      if (result.data) {
        setResultThree(result.data.queryThree);
      }  
    } catch(error) {
      setResultThree(error.message);
    }
  }

  function clear() {
    localStorage.clear();
    setIsTokenPresent(false);
  }

  return (
    <div>
      <div>
        <button onClick={clear}>Clear token</button>
      </div>
      <div>
        <button onClick={authenticate}>Authenticate</button>
        {isTokenPresent ? localStorage.getItem("token") : null}
      </div>
      <div>
        <button onClick={executeQueryOne}>Query One</button>
        {resultOne}
      </div>
      <div>
        <button onClick={executeQueryTwo}>Query Two</button>
        {resultTwo}
      </div>
      <div>
        <button onClick={executeQueryThree}>Query Three</button>
        {resultThree}
      </div>
    </div>
  )
}