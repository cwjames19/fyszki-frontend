import React from 'react';
import './ErrorDisplay.css';

type ErrorDisplayProps = {
  className: string;
  message: string;
} & typeof ErrorDisplayDefaultProps;
const ErrorDisplayDefaultProps = {
  className: '',
  message: 'An error occurred. The message was undefined.',
}

const ErrorDisplay = function ({
  className, message, ...other
}: ErrorDisplayProps) {
  console.log('message: ', message);
  return (
    <span className={`error-display ${className}`} {...other}>
      {message}
    </span>
  );
};

ErrorDisplay.defaultProps = ErrorDisplayDefaultProps;

export default ErrorDisplay;
