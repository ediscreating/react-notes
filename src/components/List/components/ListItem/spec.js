import React from 'react';
import { shallow } from 'enzyme';
import ListItem from './';
import ListItemExtraElement from './components/ListItemExtraElement/';

describe('ListItem', () => {
  const props = {
    title: 'Item',
    leftElement: (<a>Link One</a>),
    rightElement: (<a>Link Two</a>),
    titleIsOnOneLine: false
  };

  function listItem(overrideProps) {
    return shallow(<ListItem {...props} {...overrideProps} />);
  }

  describe('rendering order', () => {
    test('renders <ListItemExtraElement el={props.leftElement} position="left"/> before props.title', () => {
      const wrapper = listItem();
      const extra = wrapper.childAt(0);

      expect(extra.is(ListItemExtraElement)).toBeTruthy();
      expect(extra.props()).toEqual({
        el: props.leftElement,
        position: 'left'
      });
    });

    test('renders props.title', () => {
      const wrapper = listItem();
      expect(wrapper.childAt(1).text()).toBe(props.title);
    });

    test('renders <ListItemExtraElement el={props.rightElement} position="right"/> after props.title', () => {
      const wrapper = listItem();
      const extra = wrapper.childAt(2);

      expect(extra.is(ListItemExtraElement)).toBeTruthy();
      expect(extra.props()).toEqual({
        el: props.rightElement,
        position: 'right'
      });
    });
  });

  test('sets props.tabIndex to item\'s tabindex', () => {
    const wrapper = listItem({ tabIndex: 0 });
    expect(wrapper.prop('tabIndex')).toBe(0);
  });

  test('renders item and title with no modifiers', () => {
    const wrapper = listItem();
    expect(wrapper.prop('className')).toBe('list__item');
    expect(wrapper.find('.list__item-title').prop('className')).toBe('list__item-title');
  });

  test('adds selected modifier if props.selected is true', () => {
    expect(listItem({ selected: true }).hasClass('list__item_selected')).toBeTruthy();
  });

  test('adds clickable modifier to item if props.onClick callback is provided', () => {
    const wrapper = listItem({ onClick: () => {} });
    expect(wrapper.hasClass('list__item_clickable')).toBeTruthy();
  });

  test('adds on-one-line modifier to item-title if props.titleIsOnOneLine = true', () => {
    const wrapper = listItem({ titleIsOnOneLine: true });
    expect(wrapper.find('.list__item-title').hasClass('list__item-title_on-one-line')).toBeTruthy();
  });

  describe('focused modifier', () => {
    test('adds focused modifier to item when item is focused', () => {
      const wrapper = listItem();
      wrapper.simulate('focus');
      expect(wrapper.hasClass('list__item_focused')).toBeTruthy();
    });

    test('doesn\'t add modifier if there was mousedown event before focus', () => {
      const wrapper = listItem();
      wrapper.simulate('mousedown');
      wrapper.simulate('focus');
      expect(wrapper.hasClass('list__item_focused')).toBeFalsy();
    });

    test('removes focused modifier from item when item is blured', () => {
      const wrapper = listItem();
      wrapper.simulate('focus');
      wrapper.simulate('blur');
      expect(wrapper.hasClass('list__item_focused')).toBeFalsy();
    });
  });

  describe('pressed modifier', () => {
    let wrapper = null;

    beforeEach(() => {
      wrapper = listItem();
      wrapper.simulate('focus');
    });

    test('adds modifier when keydown event is triggered (enter)', () => {
      wrapper.simulate('keydown', { keyCode: 13 });
      expect(wrapper.hasClass('list__item_pressed')).toBeTruthy();
    });

    test('adds modifier when keydown event is triggered (space)', () => {
      wrapper.simulate('keydown', { keyCode: 32 });
      expect(wrapper.hasClass('list__item_pressed')).toBeTruthy();
    });

    test('removes modifier when keyup event is triggered (enter)', () => {
      wrapper.simulate('keydown', { keyCode: 13 });
      wrapper.simulate('keyup', { keyCode: 13 });
      expect(wrapper.hasClass('list__item_pressed')).toBeFalsy();
    });

    test('removes modifier when keyup event is triggered (space)', () => {
      wrapper.simulate('keydown', { keyCode: 32 });
      wrapper.simulate('keyup', { keyCode: 32 });
      expect(wrapper.hasClass('list__item_pressed')).toBeFalsy();
    });
  });

  describe('calls provided callbacks when appropriate event is triggered', () => {
    const events = ['keydown', 'keypress', 'keyup', 'mouseover', 'click', 'focus', 'blur'];
    const props = ['onKeyDown', 'onKeyPress', 'onKeyUp', 'onMouseOver', 'onClick', 'onFocus', 'onBlur'];

    for (let i = 0; i < events.length; i++) {
      test(`calls props.${props[i]} when ${events[i]} is triggered`, () => {
        const callback = jest.fn();
        listItem({ [props[i]]: callback }).simulate(events[i], {});
        expect(callback.mock.calls.length).toBe(1);
      });
    }
  });
});
