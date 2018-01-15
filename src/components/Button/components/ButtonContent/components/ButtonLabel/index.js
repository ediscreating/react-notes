import React from 'react';
import PropTypes from 'prop-types';

const ButtonLabel = ({ label }) => (<span className="button__label">{label}</span>);

ButtonLabel.propTypes = {
  label: PropTypes.string
};

export default ButtonLabel;
