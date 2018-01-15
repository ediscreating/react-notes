import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ListItemExtraElement from './components/ListItemExtraElement'

class ListItem extends Component {
  constructor() {
    super();

    this.state = {
      isFocused: false,
      isPressed: false
    };

    this.canSetFocused = true;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus(e) {
    this.focus();

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  handleBlur(e) {
    this.blur();

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  handleMouseDown(e) {
    this.canSetFocused = false;
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.press();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.unpress();
    }

    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }
  }

  press() {
    this.setState({
      isPressed: true
    });
  }

  unpress() {
    this.setState({
      isPressed: false
    });
  }

  focus() {
    if (!this.canSetFocused) {
      this.canSetFocused = true;
      return;
    }

    this.setState({
      isFocused: true
    });
  }

  blur() {
    this.setState({
      isFocused: false
    });
  }

  render() {
    const {
      title,
      selected,
      titleIsOnOneLine,
      leftElement,
      rightElement,
      onClick,
      onMouseOver,
      onKeyPress,
      tabIndex
    } = this.props;

    const { isFocused, isPressed } = this.state;

    const itemClass = classnames('list__item', {
      ['list__item_clickable']: Boolean(onClick),
      ['list__item_focused']: isFocused,
      ['list__item_pressed']: isPressed,
      ['list__item_selected']: selected,
    });

    const titleClass = classnames('list__item-title', {
      ['list__item-title_on-one-line']: titleIsOnOneLine
    });

    return (
      <li
        className={itemClass}
        onMouseDown={this.handleMouseDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        {...{onClick, onMouseOver, onKeyPress, tabIndex}}
      >
        {leftElement && <ListItemExtraElement el={leftElement} position="left" />}
        <span className={titleClass}>{title}</span>
        {rightElement && <ListItemExtraElement el={rightElement} position="right" />}
      </li>
    );
  }
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  titleIsOnOneLine: PropTypes.bool,
  leftElement: PropTypes.element,
  rightElement: PropTypes.element,
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func
};

export default ListItem;
