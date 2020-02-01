import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import history from '../../helpers/History';
import routes from '../../helpers/Routes';
import { onError } from '../../helpers/OnError';
import { SIGN_IN_MUTATION } from '../../mutations/userMutations';
import * as Auth from '../../helpers/Auth';
import Input from '../_utilities/Input/Input';
import Button from '../_utilities/Button/Button';
import ErrorDisplay from '../_utilities/ErrorDisplay/ErrorDisplay';
import './SignInForm.css';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };

    this.setError = this.setError.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  setError(errorMessage) {
    this.setState({ errorMessage });
  }

  handleFieldChange({ name, value }) {
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  }

  async handleSignIn() {
    const { client } = this.props;
    const { email, password } = this.state;

    try {
      const mutationResults = await client.mutate({
        mutation: SIGN_IN_MUTATION,
        variables: { email, password },
        refetchQueries: ['usersQuery', 'allDecksQuery'],
      });
      console.log('mutationResults: ', mutationResults);

      const { token, username } = mutationResults.data.signIn;
      Auth.login({ username, token });
      history.push(routes({}).home);
    } catch (err) {
      onError({ err, propertyName: 'errorMessage' });
    }
  }

  render() {
    const {
      errorMessage,
    } = this.state;
    return (
      <div className="sign-in">
        <h1>SIGN IN FORM</h1>
        <Input
          name="email"
          label="Email"
          onChange={this.handleFieldChange}
        />
        <Input
          name="password"
          label="Password"
          onChange={this.handleFieldChange}
        />
        <Button onClick={this.handleSignIn} className="sign-in__submit" label="Sign In" />
        {errorMessage && <ErrorDisplay message={errorMessage} />}
      </div>
    );
  }
}

SignInForm.propTypes = {
  client: PropTypes.object.isRequired,
};
SignInForm.defaultProps = {

};

export default withApollo(SignInForm);
