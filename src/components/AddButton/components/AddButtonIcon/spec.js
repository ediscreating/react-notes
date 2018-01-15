import React from 'react';
import { shallow } from 'enzyme';
import AddButtonIcon from './';
import Icon from 'Icon/';

describe('AddButtonIcon', () => {
  test('renders Icon as root', () => {
    expect(shallow(<AddButtonIcon />).is(Icon)).toBeTruthy();
  });

  test('passes all props to Icon', () => {
    const icon = shallow(<AddButtonIcon mixClass="mix" color="white"/>);
    expect(icon.prop('color')).toBe('white');
    expect(icon.prop('mixClass')).toBe('mix');
  });
});
