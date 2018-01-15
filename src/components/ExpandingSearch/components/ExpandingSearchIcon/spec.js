import React from 'react';
import { shallow } from 'enzyme';
import ExpandingSearchIcon from './';
import Icon from '../../../Icon/';

describe('ExpandingSearchIcon', () => {
  test('renders Icon as root', () => {
    expect(shallow(<ExpandingSearchIcon />).is(Icon)).toBeTruthy();
  });

  test('passes all props to Icon', () => {
    const icon = shallow(<ExpandingSearchIcon mixClass="mix" color="white"/>);
    expect(icon.prop('color')).toBe('white');
    expect(icon.prop('mixClass')).toBe('mix');
  });
});
