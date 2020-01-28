import React from 'react';
import { Query } from 'react-apollo';
import { USERS_QUERY } from '../queries/userQueries';
import SignUpForm from './SignUpForm/SignUpForm';
import SignInForm from './SignInForm/SignInForm';
import * as Auth from '../helpers/Auth';

const UsersTest = () => {
  console.log('.');

  return (
    <div>
      <SignUpForm />
      <SignInForm />
      <br />
      {Auth.getCurrentUser() &&
        <Query
          query={USERS_QUERY}
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

            const users = data.users.map(({ _id, email, decks }) => (
              <ul key={_id}>
                <br />
                User
                <li>{_id}</li>
                <li>{email}</li>
                <li>{decks.length}</li>
              </ul>
            ));

            return (
              <React.Fragment>
                <br />
                <p>User Count: {users.length}</p>
                {users}
              </React.Fragment>
            );
          }}
        </Query>
      }
    </div>
  );
};

export default UsersTest;
