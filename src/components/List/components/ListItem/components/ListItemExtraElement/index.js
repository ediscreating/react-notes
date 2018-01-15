import React from 'react';
import PropTypes from 'prop-types';

const classes = {
  left: 'list__item-left-el',
  right: 'list__item-right-el'
};

function ListItemExtraElement({ el, position }) {
  const props = {};

  if (typeof el.type === 'function') {
    props.mixClass = classes[position];
  } else {
    props.className = el.props.className ?
                      el.props.className + ' ' + classes[position] :
                      classes[position];
  }

  return React.cloneElement(el, props);
}

ListItemExtraElement.propTypes = {
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  el: PropTypes.element.isRequired
};

export default ListItemExtraElement;
