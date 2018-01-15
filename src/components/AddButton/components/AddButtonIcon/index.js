import React from 'react';
import Icon, { iconPropTypes } from 'Icon/';

const AddButtonIcon = props => (
  <Icon {...props}>
    <path d="M7.5 15c-.6 0-1.1-.4-1.1-1V1c0-.6.4-1 1-1h.1c.6 0 1 .4 1 1v13c0 .6-.4 1-1 1z"/>
    <path d="M15 7.2c0 .6-.4 1.1-1 1.1H1c-.6 0-1-.4-1-1v-.1c0-.6.4-1 1-1h13c.6 0 1 .5 1 1z"/>
  </Icon>
);

const { children, ...abIconPropTypes } = iconPropTypes;

AddButtonIcon.propTypes = abIconPropTypes;

export default AddButtonIcon;
