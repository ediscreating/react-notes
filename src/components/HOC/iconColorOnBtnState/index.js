import React, { PureComponent } from 'react';

function iconColorOnBtnState(Button, opts) {
  class Btn extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        iconColor: opts.default
      };

      this.statesToEvents = {
        hover: ['onMouseEnter', 'onMouseLeave'],
        focus: ['onFocus', 'onBlur']
      };

      this.states = {
        hover: false,
        focus: false
      };

      this.handlers = null;
    }

    handleEvent(eventName, stateName, e) {
      const isOpposite = this.statesToEvents[stateName].indexOf(eventName) === 1;

      if (isOpposite) {
        this.states[stateName] = false;
      } else {
        this.states[stateName] = true;
      }

      const stateNames = Object.keys(opts);
      let lastActiveState = undefined;

      for (let i = stateNames.length; i >= 0; i--) {
        if (this.states[stateNames[i]] === true) {
          lastActiveState = stateNames[i];
          break;
        }
      }

      this.setIconColor(lastActiveState ?
                        opts[lastActiveState] :
                        opts.default);

      if (this.props[eventName]) {
        this.props[eventName](e);
      }
    }

    setIconColor(color) {
      this.setState({
        iconColor: color
      });
    }

    setHandlers() {
      this.handlers = {};

      Object.keys(this.statesToEvents).forEach(state => {
        if (opts[state]) {
          const evName = this.statesToEvents[state][0];
          const oppositeEvName = this.statesToEvents[state][1];

          this.handlers[evName] = e => this.handleEvent(evName, state, e);
          this.handlers[oppositeEvName] = e => this.handleEvent(oppositeEvName, state, e);
        }
      });
    }

    componentWillMount() {
      this.setHandlers();
    }

    render() {
      const {iconColor, ...props} = this.props;

      return (
        <Button
          iconColor={iconColor || this.state.iconColor}
          {...props}
          {...this.handlers}
        />
      );
    }
  }

  Btn.displayName = getDisplayName(Button);

  return Btn;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default iconColorOnBtnState;
