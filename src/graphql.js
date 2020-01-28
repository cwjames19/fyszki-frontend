import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import * as Auth from './helpers/Auth';

const createClient = () => {
  let url = `${process.env.REACT_APP_D3A_WEB_API_URL}`;
  url = 'http://localhost:4000/graphql';

  const authLink = new ApolloLink((operation, forward) => {
    // add authorization header if not logging in
    if (operation && !operation.operationName.includes(['signInMutation', 'signUpMutation'])) {
      const token = Auth.getAuthToken();
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization: token || '',
        },
      }));
    }

    return forward(operation);
  });

  const errorLink = onError((args) => {
    const {
      graphQLErrors, networkError, response, operation,
    } = args;

    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED': {
            console.log('[GraphQL error]: Authentication Error');
            Auth.logout();
            break;
          }
          // handle other errors
          default: {
            console.log(`[GraphQL error]: ${err.message}`);
          }
        }
      });
    }

    // if (networkError) {
    //   const { statusCode } = networkError;

    //   if (statusCode && statusCode.toString() === '401') {
    //     try {
    //       // Auth.logout(client); // eslint-disable-line no-use-before-define
    //     } catch (err) {
    //       console.log('An error occurred');
    //     }
    //   } else {
    //     console.log('[Network Error]: Message', networkError);
    //   }
    // }

    if (!graphQLErrors && !networkError) {
      console.log(`Some error(s) occurred during ${operation.operationName}`);
      response.errors.forEach(({ message }) => {
        console.log('Error message: ', message);
      });
    }
  });

  const uploadLink = createUploadLink({
    uri: url,
  });

  const cache = new InMemoryCache();
  /*
    Modify cache behavior to return undefined instead of raising an error
    when an existing cache entry can not be found when querying the cache directly
  */
  cache.originalReadQuery = cache.readQuery;
  cache.readQuery = (...args) => {
    try {
      return cache.originalReadQuery(...args);
    } catch (err) {
      return undefined;
    }
  };

  const httpLink = ApolloLink.from([errorLink, authLink, uploadLink]);

  const newClient = new ApolloClient({
    link: httpLink,
    cache,
    resolvers: {},
  });

  return newClient;
};

export const client = createClient();
