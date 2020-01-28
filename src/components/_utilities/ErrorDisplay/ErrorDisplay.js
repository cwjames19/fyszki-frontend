import React from 'react';
import PropTypes from 'prop-types';
import './ErrorDisplay.css';

const ErrorDisplay = function ({
  className, message, ...other
}) {
  console.log('message: ', message);
  return (
    <span className={`error-display ${className}`} {...other}>
      {message}
    </span>
  );
};

ErrorDisplay.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
};

ErrorDisplay.defaultProps = {
  className: '',
  message: 'An error occurred. The message was undefined.',
};

export default ErrorDisplay;
