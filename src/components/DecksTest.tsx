import React from 'react';
import { Query, useApolloClient } from 'react-apollo';
import { ALL_DECKS_QUERY } from '../queries/deckQueries';
import { DELETE_DECK_MUTATION } from '../mutations/deckMutations';
import CreateDeckForm from './CreateDeckForm/CreateDeckForm';

const DecksTest = () => {
  const client = useApolloClient();

  const deleteDeck = (_id) => {
    try {
      client.mutate({
        mutation: DELETE_DECK_MUTATION,
        variables: {
          _id,
        },
      });
    } catch (err) {
      console.log('SOMETHING HAS GONE HORRIBLY WRONG');
    }
  };

  return (
    <Query
      query={ALL_DECKS_QUERY}
    >
      {({ error, loading, data }) => {
        if (error) {
          console.log('error: ', error);
          return (
            <div>
              ERROR
            </div>
          );
        } else if (loading) {
          return (
            <div>
              Loading...
            </div>
          );
        }

        const decks = data.allDecks.map(({
          _id, name, description, user: { email, _id: userID },
        }) => (
            <React.Fragment>
              <ul key={_id} style={{ marginBottom: '15px', marginLeft: '10px' }} >
                <li>Deck _id: {_id}</li>
                <li>Deck name: {name}</li>
                <li>Deck description: {description}</li>
                <li>
                  <ul style={{ marginLeft: '25px' }}>
                    User
              <li>User ID: {userID}</li>
                    <li>User email: {email}</li>
                  </ul>
                </li>
              </ul>
              <button style={{ backgroundColor: 'orange', marginBottom: '35px' }} onClick={() => { deleteDeck(_id); }}>Delete Deck</button>
            </React.Fragment>
          ));

        return (
          <div>
            <CreateDeckForm />
            <br />
            <p>Deck Count: {decks.length}</p>
            {decks}
          </div>
        );
      }}
    </Query>
  );
};

export default DecksTest;
