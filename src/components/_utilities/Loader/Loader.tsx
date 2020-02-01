import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = function ({ className }) {
  return (
    <div className={`loader__container ${className}`}>
      <div className="loader__spinner" />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: '',
};


export default Loader;
