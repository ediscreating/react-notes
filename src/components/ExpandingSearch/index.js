import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ExpandingSearchIcon from './components/ExpandingSearchIcon/';
import ExpandingSearchBtn from './components/ExpandingSearchBtn/';
import './styles.scss';

class ExpandingSearch extends Component {
  constructor() {
    super();

    this.state = {
      isExpanded: false
    };

    this.input = null;

    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleBtnPress = this.handleBtnPress.bind(this);
  }

  handleInputFocus() {
    this.setState({
      isExpanded: true
    });
  }

  handleBtnPress() {
    const isExpanded = this.state.isExpanded;

    [this.focus, this.blur][Number(isExpanded)]();

    this.setState({
      isExpanded: !isExpanded
    });
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  render() {
    const { value, onChange, zIndex } = this.props;
    const isExpanded = this.state.isExpanded;

    const inputClass = classnames('expanding-search__input', {
      ['expanding-search__input_expanded']: isExpanded
    });

    return (
      <div className="expanding-search" style={{ zIndex }}>
        <ExpandingSearchBtn
          onPress={this.handleBtnPress}
          color={isExpanded ? 'mint' : undefined}
          iconColor={isExpanded ? 'white' : undefined}
        />
        <input
          type="search"
          tabIndex="-1"
          ref={el => {this.input = el;}}
          value={value}
          className={inputClass}
          onChange={onChange && (e => onChange(e.target.value))}
          onFocus={this.handleInputFocus}
        />
      </div>
    )
  }
}

ExpandingSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  zIndex: PropTypes.number
};

export default ExpandingSearch;
