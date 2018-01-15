import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from 'List/';
import NotesListItem from './';
import NotesListItemRemoveBtn from './components/NotesListItemRemoveBtn/';

describe('NotesListItem', () => {
  const required = {
    title: 'string'
  };

  function liItem(props) {
    return shallow(<NotesListItem {...required} {...props} />);
  }

  test('renders ListItem', () => {
    expect(liItem().is(ListItem)).toBeTruthy();
  });

  test('passes remove NotesListItemRemoveBtn to ListItem\'s rightElement prop', () => {
    const wrapper = liItem();
    const el = wrapper.prop('rightElement');
    expect(el.type).toBe(NotesListItemRemoveBtn);
  });

  test('passes props.onRemoveBtnPress to NotesListItemRemoveBtn\'s onPress prop', () => {
    const fn = () => {};
    const wrapper = liItem({ onRemoveBtnPress: fn });
    const onPress = wrapper.prop('rightElement').props.onPress;

    expect(onPress).toBe(fn);
  });

  test('passes remaining props to ListItem', () => {
    const props = {
      onSelect: () => {},
      selected: true
    };
    const wrapper = liItem(props);

    expect(wrapper.prop('title')).toBe(required.title);
    expect(wrapper.prop('onClick')).toBe(props.onSelect);
    expect(wrapper.prop('selected')).toBe(props.selected);
  });

});
