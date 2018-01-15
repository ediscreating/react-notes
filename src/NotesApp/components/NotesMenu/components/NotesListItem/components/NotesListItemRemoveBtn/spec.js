import React from 'react';
import { shallow } from 'enzyme';
import RemoveButton from 'RemoveButton/';
import NotesListItemRemoveBtn from './';

describe('NotesListItemRemoveBtn', () => {
  test('renders RemoveButton', () => {
    expect(shallow(<NotesListItemRemoveBtn />).type().displayName).toBe('RemoveButton');
  });

  test('passes props to Button', () => {
    const onPress = () => {};
    const btn = shallow(<NotesListItemRemoveBtn onPress={onPress}/>);
    expect(btn.prop('onPress')).toBe(onPress);
    expect(btn.prop('round')).toBe(true);
  });
});
