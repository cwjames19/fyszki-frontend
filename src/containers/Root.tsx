import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from '../graphql';
import history from '../helpers/History';
import App from './App';

const Root = function () {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router history={history}>
          <App />
        </Router>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default Root;
