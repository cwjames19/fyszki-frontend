import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';

type ButtonProps = {
  className: string,
  onClick: Function,
  label: string,
  labelStyle: object,
  icon: string,
  iconOnly: boolean,
  disabled: boolean,
  reversed: boolean,
} & typeof ButtonDefaultProps;

const ButtonDefaultProps = {
  className: '',
  onClick: () => { },
  label: '',
  labelStyle: {},
  icon: '',
  iconOnly: false,
  disabled: false,
  reversed: false,
};

const Button = function ({
  className, onClick, label, labelStyle, icon, iconOnly, disabled, reversed,
}: ButtonProps) {
  const buttonClasses = classNames({
    button: true,
    'button--disabled': disabled,
    'button--icon': icon,
    'button--reversed': reversed,
    className,
  });

  const iconClasses: string = classNames(
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

Button.defaultProps = ButtonDefaultProps;

export default Button;
