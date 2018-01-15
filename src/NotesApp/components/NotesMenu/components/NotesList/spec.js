import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'List/';
import NotesList from './';
import NotesListItem from '../NotesListItem/';

describe('NotesList', () => {
  function notesList(props) {
    return shallow(<NotesList {...props}/>);
  }

  test('renders List as root', () => {
    expect(notesList().is(List)).toBeTruthy();
  });

  test('passes each note from props.notes as title prop to NotesListItem', () => {
    const notes = ['1', '2'];
    const items = notesList({notes}).find(NotesListItem);

    expect(items.length).toBe(2);
    expect(items.at(0).prop('title')).toBe(notes[0]);
    expect(items.at(1).prop('title')).toBe(notes[1]);
  });

  test('sets selected prop to true on NotesListItem if item\'s index is equal to selectedNoteIndex', () => {
    const selectedNoteIndex = 1;
    const wrapper = notesList({
      notes: ['1', '2', '3'],
      selectedNoteIndex: 1
    });

    expect(wrapper.find(NotesListItem).at(selectedNoteIndex).prop('selected')).toBe(true);
  });

  test('calls props.onNoteSelect with items\'s index when NotesListItem\'s onSelect prop is called', () => {
    const fn = jest.fn();
    const item = notesList({
                   notes: ['1', '2', '3'],
                   onNoteSelect: fn
                 }).childAt(2);

    item.prop('onSelect')();

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(2);
  });

  test('calls props.onNoteRemoveBtnPress with item\'s index when NotesListItem\'s onRemoveBtnPress prop is called', () => {
    const fn = jest.fn();
    const item = notesList({
                   notes: ['1', '2', '3'],
                   onNoteRemoveBtnPress: fn
                 }).childAt(2);

    item.prop('onRemoveBtnPress')({ stopPropagation() {} });

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(2);
  });
});
