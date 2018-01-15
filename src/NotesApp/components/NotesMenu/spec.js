import React from 'react';
import { shallow } from 'enzyme';
import NotesMenu from './';
import ExpandingSearch from 'ExpandingSearch/';
import FilteredNotesList from './components/FilteredNotesList/';
import NotesList from './components/NotesList/';
import NotesAddButton from './components/NotesAddButton/';

describe('NotesMenu', () => {
  function menu(props) {
    return shallow(<NotesMenu {...props}/>);
  }

  test('renders ExpandingSearch, NotesAddButton, NotesList', () => {
    const wrapper = menu();
    expect(wrapper.find(ExpandingSearch).length).toBe(1);
    expect(wrapper.find(NotesAddButton).length).toBe(1);
  });

  test('passes onChange handler to ExpandingSearch', () => {
    const search = menu().find(ExpandingSearch);
    expect(typeof search.prop('onChange')).toBe('function');
  });

  test('passes props to NotesList', () => {
    const props = {
      notes: ['1', '2'],
      onNoteSelect: () => {},
      onNoteRemoveBtnPress: () => {},
      selectedNoteIndex: 1
    };
    const wrapper = menu(props);
    const notesList = wrapper.find(NotesList);

    expect(notesList.prop('notes')).toBe(props.notes);
    expect(notesList.prop('onNoteSelect')).toBe(props.onNoteSelect);
    expect(notesList.prop('onNoteRemoveBtnPress')).toBe(props.onNoteRemoveBtnPress);
    expect(notesList.prop('selectedNoteIndex')).toBe(props.selectedNoteIndex);
  });

  test('doesn\'t render NotesList if props.notes is not provided', () => {
    expect(menu().find(NotesList).exists()).toBeFalsy();
  });

  test('passes props.onAddBtnPress to NotesAddButton onPress prop', () => {
    const fn = () => {};
    const wrapper = menu({ onAddBtnPress: fn });
    expect(wrapper.find(NotesAddButton).prop('onPress')).toBe(fn);
  });

  describe('on ExpandingSearch change', () => {
    let wrapper = null;

    const props = {
      notes: ['First note', 'Second note', 'Third note', ''],
      onNoteSelect: () => {},
      onNoteRemoveBtnPress: () => {},
      selectedNoteIndex: 1
    };

    beforeEach(() => {
      wrapper = menu(props);
      const handler = wrapper.find(ExpandingSearch).prop('onChange');
      handler('Third');
      wrapper.update();
    });

    test('passes changed value to ExpandingSearch\'s value prop', () => {
      expect(wrapper.find(ExpandingSearch).prop('value')).toBe('Third');
    });

    test('renders FilteredNotesList instead of NotesList', () => {
      expect(wrapper.find(FilteredNotesList).length).toBe(1);
      expect(wrapper.find(NotesList).length).toBe(0);
    });

    test('filters notes except empty and selected ones and passes to notes prop of FilteredNotesList', () => {
      const filteredNotes = wrapper.find(FilteredNotesList).prop('notes');

      expect(filteredNotes).toHaveLength(3);
      expect(filteredNotes).toEqual([{
        text: props.notes[1],
        index: 1
      }, {
        text: props.notes[2],
        index: 2
      }, {
        text: props.notes[3],
        index: 3
      }]);
    });

    test('updates filtered notes when props.notes are changed', () => {
      const updatedNotes = ['First note', 'Second note', ''];
      wrapper.setProps({ notes: updatedNotes });

      const filteredNotes = wrapper.find(FilteredNotesList).prop('notes');

      expect(filteredNotes).toHaveLength(2);
      expect(filteredNotes).toEqual([{
        text: updatedNotes[1],
        index: 1
      }, {
        text: updatedNotes[2],
        index: 2
      }]);
    });

    test('passes remaining props to FilteredNotesList', () => {
      const notesList = wrapper.find(FilteredNotesList);
      expect(notesList.prop('onNoteSelect')).toBe(props.onNoteSelect);
      expect(notesList.prop('selectedNoteIndex')).toBe(props.selectedNoteIndex);
      expect(notesList.prop('onNoteRemoveBtnPress')).toBe(props.onNoteRemoveBtnPress);
    });
  });
});
