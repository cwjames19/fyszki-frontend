import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';
import iconsPath from '../../../assets/icons/sprite.svg';
import './Icon.css';

const Icon = ({
  icon, className, style, ...other
}) => (
    <div className="svg-icon" style={Object.assign({}, { fill: 'currentColor' }, style)} {...other}>
      <svg viewBox="0 0 16 16" className={`icon-${snakeCase(icon)} ${className}`} xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
        <use xlinkHref={`${iconsPath}#icon_${snakeCase(icon)}`} />
      </svg>
    </div>
  );

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Icon.defaultProps = {
  className: '',
  style: {},
};

export default Icon;
