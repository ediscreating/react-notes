import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon, { iconPropTypes } from 'Icon/';

function ExpandingSearchIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3.5 5.8C3.5 2.6 6 0 9.2 0S15 2.6 15 5.8s-2.6 5.8-5.8 5.8-5.7-2.7-5.7-5.8zm.9 0c0 2.7 2.2 4.8 4.8 4.8S14 8.4 14 5.8 11.9 1 9.2 1 4.4 3.1 4.4 5.8zM1.4 14.9L5 11.3c.1-.1.1-.4 0-.5l-.8-.8c-.2-.1-.4-.1-.5 0L.1 13.6c-.1.1-.1.4 0 .5l.8.8c.1.1.4.1.5 0z"/>
    </Icon>
  );
}

const { children, ...esIconPropTypes } = iconPropTypes;

ExpandingSearchIcon.propTypes = esIconPropTypes;

export default ExpandingSearchIcon;
