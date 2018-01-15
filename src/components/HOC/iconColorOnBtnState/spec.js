import React from 'react';
import { shallow } from 'enzyme';
import iconColorOnBtnState from './';
import Button from 'Button/';
import Icon from 'Icon/';

describe('HOC iconColorOnBtnState', () => {
  const ButtonWithIcon = ({iconColor, ...props}) => {
    return (
      <Button {...props} icon={<Icon color={iconColor}/>} />
    );
  };

  test('returns function', () => {
    expect(typeof iconColorOnBtnState(ButtonWithIcon)).toBe('function')
  });

  describe('WrappedComponent', () => {
    const opts = {
      default: 'white',
      hover: 'mint',
      focus: 'white'
    };

    const WrappedComponent = iconColorOnBtnState(ButtonWithIcon, opts);

    test('renders passed component', () => {
      expect(shallow(<WrappedComponent />).is(ButtonWithIcon)).toBeTruthy();
    });

    test('passes props to enhanced component', () => {
      const wrapper = shallow(<WrappedComponent label="value" labelPosition="right"/>)
      expect(wrapper.prop('label')).toBe('value');
      expect(wrapper.prop('labelPosition')).toBe('right');
    });

    test('passes default color from opts to enhanced component iconColor prop', () => {
      const wrapper = shallow(<WrappedComponent />);
      expect(wrapper.prop('iconColor')).toBe(opts.default);
    });

    describe('enhanced component\'s iconColor prop on btn state changes', () => {
      test('sets appropriate color on each state change', () => {
        const wrapper = shallow(<WrappedComponent />);
        wrapper.simulate('mouseenter');
        expect(wrapper.prop('iconColor')).toBe(opts.hover);
        wrapper.simulate('focus');
        expect(wrapper.prop('iconColor')).toBe(opts.focus);
        wrapper.simulate('blur');
        expect(wrapper.prop('iconColor')).toBe(opts.hover);
        wrapper.simulate('mouseleave');
        expect(wrapper.prop('iconColor')).toBe(opts.default);
      });

      test('always sets color with higher priority (later declared state -> higher priority)', () => {
        const wrapper = shallow(<WrappedComponent />);
        wrapper.simulate('focus');
        wrapper.simulate('mouseenter');
        expect(wrapper.prop('iconColor')).toBe(opts.focus);
      });
    });

    test('doesn\'t pass color if WrappedComponent\'s prop.iconColor is defined', () => {
      const wrapper = shallow(<WrappedComponent iconColor='white'/>);
      wrapper.simulate('mouseenter');
      expect(wrapper.prop('iconColor')).toBe('white');
    });

    describe('calls passed event callbacks with appropriate arguments', () => {
      const wrapper = shallow(<WrappedComponent />);
      const events = ['mouseenter', 'mouseleave', 'focus', 'blur'];
      const propNames = ['onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];

      for (let i = 0; i < events.length; i++) {
        test(`${events[i]}`, () => {
          const fn = jest.fn();
          const args = {};
          const wrapper = shallow(<WrappedComponent {...{ [propNames[i]]: fn  }}/>);

          wrapper.simulate(events[i], args);

          expect(fn.mock.calls.length).toBe(1);
          expect(fn.mock.calls[0][0]).toBe(args);
        });
      }
    });
  });
});
