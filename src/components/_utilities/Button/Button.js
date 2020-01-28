import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

const Button = function ({
  className, onClick, label, labelStyle, icon, iconOnly, disabled, reversed,
}) {
  const buttonClasses = classNames({
    button: true,
    'button--disabled': disabled,
    'button--icon': icon,
    'button--reversed': reversed,
    className,
  });

  const iconClasses = classNames(
    'button__icon',
    `icon--${icon}`,
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {!iconOnly &&
        <span className="button__label" style={labelStyle}> {label} </span>
      }
      {icon &&
        <i className={iconClasses}><Icon icon={icon} /></i>
      }
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  icon: PropTypes.string,
  iconOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  reversed: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  onClick: () => { },
  label: '',
  labelStyle: {},
  icon: '',
  iconOnly: false,
  disabled: false,
  reversed: false,
};

export default Button;
