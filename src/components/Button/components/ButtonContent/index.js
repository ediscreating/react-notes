import React, { Fragment } from 'react';
import ButtonLabel from './components/ButtonLabel';
import ButtonIcon from './components/ButtonIcon';
import PropTypes from 'prop-types';

const labelToIconPositions = {
  left: 'right',
  right: 'left'
};

function ButtonContent({ label, labelPosition, icon }) {
  let content = null;

  const iconPosition = !label ? 'center' : labelToIconPositions[labelPosition];

  if (labelPosition === 'right') {
    content = (
      <Fragment>
        {icon && <ButtonIcon el={icon} position={iconPosition}/>}
        {label && <ButtonLabel value={label} />}
      </Fragment>
    );
  } else if (labelPosition === 'left') {
    content = (
      <Fragment>
        {label && <ButtonLabel value={label} />}
        {icon && <ButtonIcon el={icon} position={iconPosition}/>}
      </Fragment>
    );
  }

  return content;
}

ButtonContent.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right'])
};

ButtonContent.defaultProps = {
  labelPosition: 'left'
};

export default ButtonContent;
