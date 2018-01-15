import React from 'react';
import { shallow } from 'enzyme';
import Icon from './';

describe('Icon', () => {
  function icon(props, children) {
    return shallow(
      <Icon {...props}>
        {children}
      </Icon>
    );
  }

  test('renders svg root', () => {
    expect(icon().type('svg')).toBeTruthy();
  });

  test('renders props.children in svg', () => {
    const children = [<path key="path"/>, <circle key="circle"/>];
    const wrapper = icon({}, children);
    expect(wrapper.childAt(0).equals(children[0])).toBeTruthy();
    expect(wrapper.childAt(1).equals(children[1])).toBeTruthy();
  });

  test('sets color modifier value to props.color', () => {
    const wrapper = icon({ color: 'white' });
    expect(wrapper.hasClass('icon_color_white')).toBeTruthy();
  })

  test('adds props.mixClass to className', () => {
    const wrapper = icon({ mixClass: 'mix' });
    expect(wrapper.hasClass('mix')).toBeTruthy();
  });
});
