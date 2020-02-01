import gql from 'graphql-tag';

export const USERS_QUERY = gql`
  query usersQuery {
    users {
      _id
      email
      password
      decks {
        _id
        name
      }
    }
  }
`;

export const USER_QUERY = gql`
  query user (
    $_id: String!
  ) {
    _id
    email
    password
    decks {
      _id
      name
    }
  }
`;
