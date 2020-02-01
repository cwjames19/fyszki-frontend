import React from 'react';
// import PropTypes from 'prop-types';
import * as Auth from '../helpers/Auth';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const currentUser = Auth.getCurrentUser();
    return (
      <div>
        <h1>PLACEHOLDER HOME PAGE</h1>
        <h1>Current User: {currentUser}</h1>
      </div>
    );
  }
}

HomePage.propTypes = {

};
HomePage.defaultProps = {

};

export default HomePage;
