import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { CREATE_DECK_MUTATION } from '../../mutations/deckMutations';
import { onError } from '../../helpers/OnError';
import Input from '../_utilities/Input/Input';
import Button from '../_utilities/Button/Button';
import ErrorDisplay from '../_utilities/ErrorDisplay/ErrorDisplay';
import './CreateDeckForm.css';

class CreateDeckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      errorMessage: '',
    };

    this.setError = this.setError.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCreateDeck = this.handleCreateDeck.bind(this);
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

  async handleCreateDeck() {
    const { client } = this.props;
    const { name, description } = this.state;

    try {
      const mutationResults = await client.mutate({
        mutation: CREATE_DECK_MUTATION,
        variables: { name, description },
        refetchQueries: ['usersQuery', 'allDecksQuery'],
      });
      console.log('mutationResults: ', mutationResults);
    } catch (err) {
      onError.call(this, { err, propertyName: 'errorMessage' });
    }
  }

  render() {
    const {
      errorMessage,
    } = this.state;
    return (
      <div className="create-deck">
        <Input
          name="name"
          label="Name"
          onChange={this.handleFieldChange}
        />
        <Input
          name="description"
          label="Description (Optional)"
          onChange={this.handleFieldChange}
        />
        <Button onClick={this.handleCreateDeck} className="create-deck__submit" label="Create Deck" />
        {errorMessage && <ErrorDisplay message={errorMessage} />}
      </div>
    );
  }
}

CreateDeckForm.propTypes = {
  client: PropTypes.object.isRequired,
};
CreateDeckForm.defaultProps = {

};

export default withApollo(CreateDeckForm);
