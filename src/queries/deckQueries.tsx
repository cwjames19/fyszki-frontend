import gql from 'graphql-tag';

export const ALL_DECKS_QUERY = gql`
  query allDecks {
    allDecks {
      _id
      name
      description
      user {
        _id
        email
      }
    }
  }
`;

export const DECKS_QUERY = gql`
  query decks(
    $userID: String!
  ) {
    decks {
      _id
      name
      description
      user {
        _id
        email
      }
    }
  }
`;

export const DECK_QUERY = gql`
  query deck(
    $_id: String!
  ) {
    _id
    name
    description
    cards {
      _id
      sideOne
      sideTwo
    }
  }
`;
