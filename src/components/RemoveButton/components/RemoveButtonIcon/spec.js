import React from 'react';
import { shallow } from 'enzyme';
import Icon from 'Icon/';
import RemoveButtonIcon from './';

describe('RemoveButtonIcon', () => {
  test('renders Icon', () => {
    expect(shallow(<RemoveButtonIcon/>).is(Icon)).toBeTruthy();
  });

  test('passes all props to Icon', () => {
    const icon = shallow(<RemoveButtonIcon mixClass="mix" color="white"/>);
    expect(icon.prop('color')).toBe('white');
    expect(icon.prop('mixClass')).toBe('mix');
  });
});
