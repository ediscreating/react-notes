import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AddButtonIcon from './components/AddButtonIcon/'
import Button, { buttonPropTypes } from 'Button/';

function AddButton({iconColor, ...other}) {
  return (
    <Button {...other} icon={<AddButtonIcon color={iconColor}/>}/>
  );
}

AddButton.propTypes = {
  ...buttonPropTypes,
  iconColor: PropTypes.string
};

export default AddButton;
