import React from 'react';
import { snakeCase } from 'lodash';
import iconsPath from '../../../assets/icons/sprite.svg';
import './Icon.css';

type IconProps = {
  icon?: string;
  className?: string;
  style: {};
} & typeof IconDefaultProps;
const IconDefaultProps = {
  className: '',
  style: {},
};

const Icon = ({
  icon, className, style, ...other
}: IconProps) => (
    <div className="svg-icon" style={Object.assign({}, { fill: 'currentColor' }, style)} {...other}>
      <svg viewBox="0 0 16 16" className={`icon-${snakeCase(icon)} ${className}`} xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`${iconsPath}#icon_${snakeCase(icon)}`} />
      </svg>
    </div>
  );

Icon.defaultProps = IconDefaultProps;

export default Icon;
