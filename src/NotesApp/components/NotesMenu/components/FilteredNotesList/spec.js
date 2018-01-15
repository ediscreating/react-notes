import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'List/';
import NotesListItem from '../NotesListItem/';
import FilteredNotesList from './';

describe('FilteredNotesList', () => {
  const notes = [{
    index: 5,
    text: 'title one'
  }, {
    index: 10,
    text: 'title two'
  }];

  test('renders List as root', () => {
    expect(shallow(<FilteredNotesList />).is(List)).toBeTruthy();
  });

  test('renders each note.title from props.notes to NotesListItem\'s title prop', () => {
    const items = shallow(<FilteredNotesList notes={notes}/>).find(NotesListItem);

    expect(items.length).toBe(2);
    expect(items.at(0).prop('title')).toBe(notes[0].text);
    expect(items.at(1).prop('title')).toBe(notes[1].text);
  });

  test('sets selected prop to true on NotesListItem if props.note.index is equal to props.selectedNoteIndex', () => {
    const selectedNoteIndex = 10;
    const wrapper = shallow(<FilteredNotesList
                             notes={notes}
                             selectedNoteIndex={selectedNoteIndex} />);

    expect(wrapper.find(NotesListItem).at(1).prop('selected')).toBe(true);
  });

  test('calls props.onNoteSelect with props.note.index when NotesListItem\'s onSelect prop is called', () => {
    const fn = jest.fn();
    const item = shallow(<FilteredNotesList
                          notes={notes}
                          onNoteSelect={fn} />).childAt(1);

    item.prop('onSelect')();

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(notes[1].index);
  });

  test('calls props.onNoteRemoveBtnPress with props.note.index when NotesListItem\'s onRemoveBtnPress prop is called', () => {
    const fn = jest.fn();
    const item = shallow(<FilteredNotesList
                          notes={notes}
                          onNoteRemoveBtnPress={fn} />).childAt(1);

    item.prop('onRemoveBtnPress')({ stopPropagation() {} });

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(notes[1].index);
  });
});
