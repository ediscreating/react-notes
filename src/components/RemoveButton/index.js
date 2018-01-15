import React from 'react';
import PropTypes from 'prop-types';
import Button, { buttonPropTypes } from 'Button/';
import RemoveButtonIcon from './components/RemoveButtonIcon';

function RemoveButton({iconColor, ...props}) {
  return (
    <Button
      icon={<RemoveButtonIcon color={iconColor} />}
      {...props}
    />
  );
}

RemoveButton.propTypes = {
  ...buttonPropTypes,
  iconColor: PropTypes.string
};

export default RemoveButton;
