import React from 'react';
import { shallow } from 'enzyme';
import ButtonContent from './';
import ButtonLabel from './components/ButtonLabel/';
import ButtonIcon from './components/ButtonIcon/';

describe('ButtonContent', () => {
  const defaultProps = {
    icon: <svg></svg>,
    label: 'Value',
    labelPosition: 'left'
  };

  function btnContent(props) {
    return shallow(<ButtonContent {...defaultProps} {...props} />);
  }

  test('renders ButtonLabel before ButtonIcon if props.labelPosition = "left"', () => {
    const wrapper = btnContent();
    expect(wrapper.childAt(0).is(ButtonLabel)).toBeTruthy();
    expect(wrapper.childAt(1).is(ButtonIcon)).toBeTruthy();
  });

  test('renders ButtonLabel after ButtonIcon if props.labelPosition = "right"', () => {
    const wrapper = btnContent({ labelPosition: 'right'});
    expect(wrapper.childAt(0).is(ButtonIcon)).toBeTruthy();
    expect(wrapper.childAt(1).is(ButtonLabel)).toBeTruthy();
  });

  test('doesn\'t render ButtonLabel if props.label is undefined', () => {
    const wrapper = btnContent({ label: undefined });
    expect(wrapper.find(ButtonLabel).exists()).toBeFalsy()
  });

  test('doesn\'t render ButtonIcon if props.icon is undefined', () => {
    const wrapper = btnContent({ icon: undefined });
    expect(wrapper.find(ButtonIcon).exists()).toBeFalsy()
  });

  test('passes props.label to value prop of ButtonLabel', () => {
    const wrapper = btnContent();
    expect(wrapper.find(ButtonLabel).prop('value')).toBe(defaultProps.label);
  });

  test('passes props.icon to el prop of ButtonIcon', () => {
    const wrapper = btnContent();
    expect(wrapper.find(ButtonIcon).prop('el')).toBe(defaultProps.icon);
  });

  describe('ButtonIcon\'s position prop', () => {
    test('sets position prop equal to right if props.labelPosition = "left"', () => {
      const wrapper = btnContent();
      expect(wrapper.find(ButtonIcon).prop('position')).toBe('right');
    });

    test('sets position prop equal to left if props.labelPosition = "right"', () => {
      const wrapper = btnContent({ labelPosition: 'right' });
      expect(wrapper.find(ButtonIcon).prop('position')).toBe('left');
    });

    test('sets position prop equal to center if props.label is undefined', () => {
      const wrapper = btnContent({ label: undefined });
      expect(wrapper.find(ButtonIcon).prop('position')).toBe('center');
    });
  });
});
