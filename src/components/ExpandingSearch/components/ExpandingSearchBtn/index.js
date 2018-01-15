import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button, { buttonPropTypes } from 'Button/';
import ExpandingSearchIcon from '../ExpandingSearchIcon/';
import iconColorOnBtnState from 'HOC/iconColorOnBtnState/';

function ExpandingSearchBtn({ iconColor, ...props }) {
  return (
    <Button
      {...props}
      icon={<ExpandingSearchIcon color={iconColor} />}
      mixClass="expanding-search__button"
      round
    />
  );
}

ExpandingSearchBtn.propTypes = {
  ...buttonPropTypes,
  iconColor: PropTypes.string
};

export default iconColorOnBtnState(ExpandingSearchBtn, {
  default: 'mint',
  focus: 'white',
  hover: 'white'
});
