import React from 'react';
import { shallow } from 'enzyme';
import ButtonLabel from './';

describe('ButtonLabel', () => {
  test('renders props.label in span', () => {
    const wrapper = shallow(<ButtonLabel label="label"/>);
    expect(wrapper.is('span')).toBeTruthy();
    expect(wrapper.text()).toBe('label');
  });
});
