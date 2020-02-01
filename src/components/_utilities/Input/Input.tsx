import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const FormInput = function ({
  label, name, onChange, reference,
}) {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange({ value, name });
  };

  return (
    <div className="input__container">
      <label htmlFor={`form-modal-${name}`} >
        <span className="input__label-text">{label}</span>
        <input
          className="input__input"
          type="text"
          name={name}
          id={`form-modal-${name}`}
          onChange={handleChange}
          ref={reference}
        />
      </label>
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  reference: PropTypes.object,
};

FormInput.defaultProps = {
  label: '',
  name: '',
  onChange: () => { },
  reference: null,
};

export default FormInput;
