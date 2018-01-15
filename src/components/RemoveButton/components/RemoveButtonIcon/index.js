import React from 'react';
import Icon, { iconPropTypes } from 'Icon/';

function RemoveButtonIcon(props) {
  return (
    <Icon {...props}>
      <path d="M13.9 3.3H1c-.6 0-1-.4-1-1s.4-1 1-1h12.9c.6 0 1 .4 1 1s-.4 1-1 1zM9.5 1h-4C5.2 1 5 .8 5 .5s.2-.5.5-.5h4c.2 0 .5.2.5.5s-.3.5-.5.5zM4.9 6.4v4c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5zM8 6.4v4c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5zM11.1 6.4v4c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5z"/>
      <path d="M13 4.9l-.9 8H3l-.9-8c-.1-.5-.5-.9-1-.9-.6 0-1.1.5-1 1.1L1.2 15h12.7L15 5.1c.1-.6-.4-1.1-1-1.1-.5 0-.9.4-1 .9z"/>
    </Icon>
  );
}

const { children, ...rbIconPropTypes } = iconPropTypes;

RemoveButtonIcon.propTypes = rbIconPropTypes;

export default RemoveButtonIcon;
