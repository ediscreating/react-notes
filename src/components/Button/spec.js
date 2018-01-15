import React from 'react';
import { shallow } from 'enzyme';
import Button from './';
import ButtonContent from './components/ButtonContent/'
import className from './className';

describe('<Button />', () => {
  function btn(props) {
    return shallow(<Button {...props} />);
  }

  test('renders button', () => {
    expect(btn().is('button')).toBeTruthy();
  });

  test('renders ButtonContent as child of button', () => {
    expect(btn().childAt(0).is(ButtonContent)).toBeTruthy();
  });

  test('passes props.icon, label and labelPosition to ButtonContent', () => {
    const props = {
      icon: (<svg></svg>),
      label: 'value',
      labelPosition: 'right'
    };
    const wrapper = btn(props);

    expect(wrapper.find(ButtonContent).props()).toEqual(props);
  });

  test('doesn\'t pass props.label to label prop of ButtonContent if props.round = true', () => {
    const wrapper = btn({ label: 'value', round: true });
    expect(wrapper.find(ButtonContent).prop('label')).toBeUndefined();
  });

  describe('calls provided callbacks when appropriate event is triggered', () => {
    const events = ['click', 'mouseenter', 'mouseleave', 'focus', 'blur'];
    const props = ['onPress', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];

    for (let i = 0; i < events.length; i++) {
      test(`calls props.${props[i]} when ${events[i]} is triggered`, () => {
        const callback = jest.fn();
        const wrapper = btn({ [props[i]]: callback });

        if (events[i] === 'blur') {
          wrapper.simulate('focus');
        }

        wrapper.simulate(events[i], {});

        expect(callback.mock.calls.length).toBe(1);
      });
    }
  });

  test('adds round modifier if props.round = true', () => {
    expect(btn({ round: true }).hasClass(className.round)).toBeTruthy();
  });

  test('adds color modifier with value setted to props.color', () => {
    expect(btn({ color: 'mint' }).hasClass(className.color.mint)).toBeTruthy();
  });

  test('adds props.mixClass to button\'s class', () => {
    expect(btn({ mixClass: 'mix' }).hasClass('mix')).toBeTruthy();
  });

  describe('button\'s class toggle', () => {
    let wrapper = null;

    beforeEach(() => {
      wrapper = btn();
    });

    test('adds focused modifier when button is focused', () => {
      wrapper.simulate('focus');
      expect(wrapper.hasClass(className.focused)).toBeTruthy();
    });

    test('doesn\'t add focused modifier if there was mousedown event before focus', () => {
      wrapper.simulate('mousedown');
      wrapper.simulate('focus');
      expect(wrapper.hasClass(className.focused)).toBeFalsy();
    });

    test('adds pressed class when keydown (enter) event is triggered', () => {
      wrapper.simulate('keydown', { keyCode: 13 });
      expect(wrapper.hasClass(className.pressed)).toBeTruthy();
    })

    test('adds pressed class when keydown (space) event is triggered', () => {
      wrapper.simulate('keydown', { keyCode: 32 });
      expect(wrapper.hasClass(className.pressed)).toBeTruthy();
    });

    test('removes pressed class when keyup event is triggered', () => {
      wrapper.simulate('keydown', { keyCode: 32 });
      expect(wrapper.hasClass(className.pressed)).toBeTruthy();
      wrapper.simulate('keyup');
      expect(wrapper.hasClass(className.pressed)).toBeFalsy();
    });
  });
});
