import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import history from '../../helpers/History';
import routes from '../../helpers/Routes';
import { onError } from '../../helpers/OnError';
import { SIGN_UP_MUTATION } from '../../mutations/userMutations';
import * as Auth from '../../helpers/Auth';
import Input from '../_utilities/Input/Input';
import Button from '../_utilities/Button/Button';
import ErrorDisplay from '../_utilities/ErrorDisplay/ErrorDisplay';
import './SignUpForm.css';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };

    this.setError = this.setError.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
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

  async handleSignUp() {
    const { client } = this.props;
    const { email, password, confirmPassword } = this.state;

    try {
      const mutationResults = await client.mutate({
        mutation: SIGN_UP_MUTATION,
        variables: { email, password, confirmPassword },
        refetchQueries: ['usersQuery', 'allDecksQuery'],
      });
      console.log('mutationResults: ', mutationResults);

      const { token, username } = mutationResults.data.signUp;
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
      <div className="sign-up">
        <h1>SIGN UP FORM</h1>
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
        <Input
          name="confirmPassword"
          label="Confirm Password"
          onChange={this.handleFieldChange}
        />
        <Button onClick={this.handleSignUp} className="sign-up__submit" label="Sign Up" />
        {errorMessage && <ErrorDisplay message={errorMessage} />}
      </div>
    );
  }
}

SignUpForm.propTypes = {
  client: PropTypes.object.isRequired,
};
SignUpForm.defaultProps = {

};

export default withApollo(SignUpForm);
