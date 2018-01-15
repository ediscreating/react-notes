import React from 'react';
import PropTypes from 'prop-types';

const classes = {
  left: 'button__left-icon',
  center: 'button__center-icon',
  right: 'button__right-icon'
};

function ButtonIcon({ el, position }) {
  const mixClass = classes[position];
  const props = {};

  if (typeof el.type === 'function') {
    props.mixClass = mixClass;
  } else {
    props.className = el.props.className + ' ' + mixClass;
  }

  return React.cloneElement(el, props);
}

ButtonIcon.propTypes = {
  el: PropTypes.element.isRequired,
  position: PropTypes.oneOf(['left', 'center', 'right'])
};

ButtonIcon.defaultProps = {
  position: 'right'
};

export { ButtonIcon as default, classes as buttonIconClasses };
