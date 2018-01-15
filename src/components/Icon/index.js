import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './styles.scss';

const className = {
  block: 'icon',
  color: {
    white: 'icon_color_white',
    mint: 'icon_color_mint',
    ['light-grey']: 'icon_color_light-grey',
    ['mid-grey']: 'icon_color_mid-grey'
  }
};

function Icon({ children, color, mixClass }) {
  const iconClass = classnames(className.block, className.color[color], mixClass);

  return (
    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
      {children}
    </svg>
  );
}

const iconPropTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  color: PropTypes.oneOf(['mint', 'white', 'light-grey', 'mid-grey']),
  mixClass: PropTypes.string
};

Icon.propTypes = Object.assign({}, iconPropTypes);

export { Icon as default, iconPropTypes };
