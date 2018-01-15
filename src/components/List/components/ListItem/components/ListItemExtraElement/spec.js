import React from 'react';
import { shallow } from 'enzyme';
import ListItemExtraElement from './';

describe('ListItemExtraElement', () => {
  function SomeComponent() {
    return null;
  }

  const required = {
    el: <SomeComponent />,
    position: 'left'
  };

  const leftMixClass = 'list__item-left-el';
  const rightMixClass = 'list__item-right-el';

  function extraEl(props) {
    return shallow(<ListItemExtraElement {...required} {...props} />);
  }

  test('renders props.el', () => {
    const wrapper = extraEl();
    expect(wrapper.is(SomeComponent)).toBeTruthy();
  });

  describe('setting class to props.el\'s mixClass prop if props.el is Component', () => {
    test(`adds ${leftMixClass} class if props.position = "left"`, () => {
      const wrapper = extraEl();
      expect(wrapper.prop('mixClass')).toBe(leftMixClass);
    });

    test(`adds ${rightMixClass} class if props.position = "right"`, () => {
      const wrapper = extraEl({ position: 'right' });
      expect(wrapper.prop('mixClass')).toBe(rightMixClass);
    });
  });

  describe('adding class to props.el\'s className prop if props.el is element', () => {
    const elementClass = 'element';
    const el = <a className={elementClass}>Link</a>;

    test(`adds ${leftMixClass} class if props.position = "left"`, () => {
      const wrapper = extraEl({ el });
      expect(wrapper.prop('className')).toBe(elementClass + ' ' + leftMixClass);
    });

    test(`adds ${rightMixClass} class if props.position = "right"`, () => {
      const wrapper = extraEl({ el, position: 'right' });
      expect(wrapper.prop('className')).toBe(elementClass + ' ' + rightMixClass);
    });
  });
});
