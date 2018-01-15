import React from 'react';
import { shallow } from 'enzyme';
import ButtonIcon, { buttonIconClasses } from './';

describe('ButtonIcon', () => {
  function SomeIcon() {
    return null;
  }

  function btnIcon(props) {
    return shallow(<ButtonIcon {...props} />);
  }

  test('renders props.el', () => {
    const wrapper = btnIcon({ el: <SomeIcon/> });
    expect(wrapper.is(SomeIcon)).toBeTruthy();
  });

  describe('props.el\'s mix class', () => {
    const positions = ['left', 'center', 'right'];

    describe('setting class to props.el\'s mixClass prop if props.el is Component', () => {
      positions.forEach(position => {
        test(`adds ${buttonIconClasses[position]} class if props.position = "${position}"`, () => {
          const wrapper = btnIcon({ el: <SomeIcon/>, position });
          expect(wrapper.prop('mixClass')).toBe(buttonIconClasses[position]);
        });
      });
    });

    describe('adding class to props.el\'s className prop if props.el is element', () => {
      const elementClass = 'icon';
      const el = <svg className={elementClass}></svg>;

      positions.forEach(position => {
        test(`adds ${buttonIconClasses[position]} class if props.position = "${position}"`, () => {
          const wrapper = btnIcon({ el, position });
          expect(wrapper.prop('className')).toBe(elementClass + ' ' + buttonIconClasses[position]);
        });
      });
    });
  });
});
