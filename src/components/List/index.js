import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './components/ListItem/';
import './styles.scss';

function List({ children: items, mixClass }) {
  const listClass = mixClass ? 'list ' + mixClass : 'list';

  return (
    <ul className={listClass}>
      {items}
    </ul>
  )
}

List.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  mixClass: PropTypes.string
};

export { List, ListItem };
