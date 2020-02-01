import gql from 'graphql-tag';

export const CREATE_DECK_MUTATION = gql`
  mutation createDeckMutation (
    $name: String!,
    $description: String,
  ) {
    createDeck (
      name: $name,
      description: $description
    ) {
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

export const DELETE_DECK_MUTATION = gql`
  mutation deleteDeckMutation (
    $_id: String!
  ) {
    deleteDeck (
      _id: $_id,
    )
  }
`;
