import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import className from './className';
import ButtonContent from './components/ButtonContent/';
import './styles.scss';

class Button extends PureComponent {
  constructor() {
    super();

    this.state = {
      isPressed: false,
      isFocused: false
    };

    this.canSetFocused = true;

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleMouseDown(e) {
    this.canSetFocused = false;
  }

  handleKeyDown(e) {
    if ((e.keyCode === 32 || e.keyCode === 13)) {
      this.setState({
        isPressed: true
      });
    }
  }

  handleKeyUp() {
    this.setState({
      isPressed: false
    });
  }

  handleFocus(e) {
    if (!this.canSetFocused) {
      this.canSetFocused = true;
      return;
    }

    this.setState({
      isFocused: true
    });

    if (this.props.onFocus) this.props.onFocus(e);
  }

  handleBlur(e) {
    this.setState({
      isFocused: false,
      isPressed: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  }

  render() {
    const {
      round, color, mixClass,
      onPress, onMouseEnter, onMouseLeave,
      icon, label, labelPosition
    } = this.props;
    const { isPressed, isFocused } = this.state;

    const clss = classnames(className.default, {
      [className.round]: round,
      [className.focused]: isFocused,
      [className.pressed]: isPressed
    }, className.color[color], mixClass);

    return (
      <button
        type="button"
        className={clss}
        onMouseDown={this.handleMouseDown}
        onClick={onPress}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...{ onMouseEnter, onMouseLeave }}
      >
        <ButtonContent {...{
          label: !round ? label : undefined,
          labelPosition,
          icon
        }}/>
      </button>
    );
  }
}

const buttonPropTypes = {
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  icon: PropTypes.element,
  color: PropTypes.oneOf(['mint']),
  round: PropTypes.bool,
  mixClass: PropTypes.string,
  onPress: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

Button.propTypes = Object.assign({}, buttonPropTypes);
Button.defaultProps = {
  labelPosition: 'left',
  round: false
};

export { Button as default, buttonPropTypes };
