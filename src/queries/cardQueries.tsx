import gql from 'graphql-tag';

export const CARDS_QUERY = gql`
  query cards (
    $deckID: String!
  ) {
    cards {
      _id
      sideOne
      sideTwo
      deck {
        _id
        name
        description
      }
    }
  }
`;

export const CARD_QUERY = gql`
  query card (
    $_id: String!
  ) {
    _id
    sideOne
    sideTwo
    deck {
      _id
      name
      description
    }
  }
`;
