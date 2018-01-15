import React from 'react';
import { shallow } from 'enzyme';
import NotesAddButton from './';

describe('NotesAddButton', () => {
  test('renders button wrapper as root', () => {
    expect(shallow(<NotesAddButton />).is('.notes__add-btn')).toBeTruthy();
  });

  test('passes props to Button', () => {
    const onPress = () => {};
    const btn = shallow(<NotesAddButton onPress={onPress}/>).childAt(0);
    expect(btn.prop('onPress')).toBe(onPress);
    expect(btn.prop('round')).toBe(true);
  });
});
