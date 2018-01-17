import React from 'react';
import { shallow, mount } from 'enzyme';
import NotesMenu from './components/NotesMenu';
import NoteView from './components/NoteView';
import Notes from './index.js';

describe('Notes', () => {
  function notes(useShallow = true) {
    function callHandler(wrapper, Component, prop, arg) {
      const handler = wrapper.find(Component).prop(prop);
      handler(arg);
      wrapper.update();
    }

    return {
      wrapper: useShallow ? shallow(<Notes />) : mount(<Notes />),
      addNotes(notes) {
        notes.forEach(note => {
          this.addNote().changeNote(note);
        });
        return this;
      },
      addNote() {
        callHandler(this.wrapper, NotesMenu, 'onAddBtnPress');
        return this;
      },
      changeNote(value) {
        callHandler(this.wrapper, NoteView, 'onNoteChange', value);
        return this;
      },
      selectNote(index) {
        callHandler(this.wrapper, NotesMenu, 'onNoteSelect', index);
        return this;
      },
      removeNote(index) {
        callHandler(this.wrapper, NotesMenu, 'onNoteRemoveBtnPress', index);
        return this;
      },
      find(selector) {
        return this.wrapper.find(selector);
      }
    };
  }

  test('renders NotesMenu and NoteView', () => {
    const { wrapper } = notes();
    expect(wrapper.find(NotesMenu).length).toBe(1);
    expect(wrapper.find(NoteView).length).toBe(1);
  });

  test('passes notes to NotesMenu notes prop (starts with empty note)', () => {
    expect(notes().find(NotesMenu).prop('notes')).toEqual(['']);
  });

  test('adds new empty note when onAddBtnPress callback is invoked', () => {
    const notesComponent = notes();
    notesComponent.addNote();
    expect(notesComponent.find(NotesMenu).prop('notes')).toEqual(['', '']);
  });

  test('applies changes when onNoteChange callback is invoked', () => {
    const notesComponent = notes();
    notesComponent.addNote().selectNote(1).changeNote('Changed Note');
    expect(notesComponent.find(NotesMenu).prop('notes')).toEqual(['', 'Changed Note'])
  });

  test('passes selected note to NoteView\'s noteValue prop when onNoteSelect callback is invoked', () => {
    const notesComponent = notes();

    expect(notesComponent.find(NoteView).prop('noteValue')).toBe('');
    notesComponent.addNote().selectNote(1).changeNote('Value');
    expect(notesComponent.find(NoteView).prop('noteValue')).toBe('Value');
  });

  test('passes selected note\'s index to NotesMenu selectedNoteIndex prop', () => {
    const notesComponent = notes();
    notesComponent.addNote().selectNote(1);
    expect(notesComponent.find(NotesMenu).prop('selectedNoteIndex')).toBe(1);
  });

  test('removes note when onNoteRemoveBtnPress callback is invoked', () => {
    const notesComponent = notes();
    notesComponent.addNotes(['Note one', 'Note Two']).removeNote(2);
    expect(notesComponent.find(NotesMenu).prop('notes')).toEqual(['', 'Note one']);
  });

  test('updates selectedNoteIndex when note is removed', () => {
    const notesComponent = notes();

    notesComponent.addNotes(['Note one', 'Note Two', 'Note three']).selectNote(1).removeNote(1);
    expect(notesComponent.wrapper.find(NotesMenu).prop('selectedNoteIndex')).toBe(0);
    notesComponent.removeNote(0);
    expect(notesComponent.wrapper.find(NotesMenu).prop('selectedNoteIndex')).toBe(0);
  });

  test('adds new empty note if all notes are removed', () => {
    const notesComponent = notes();
    notesComponent.addNotes(['Note one']).removeNote(1).removeNote(0);

    expect(notesComponent.wrapper.find(NotesMenu).prop('selectedNoteIndex')).toBe(0);
    expect(notesComponent.wrapper.find(NotesMenu).prop('notes')).toEqual(['']);
  });

  describe('calls focusTextArea method of NoteView', () => {
    let notesComponent = null;
    let spy = null;

    beforeEach(() => {
      notesComponent = notes(false);
      const noteView = notesComponent.find(NoteView).instance();
      spy = jest.spyOn(noteView, 'focusTextArea');
    });

    test('on note add', () => {
      notesComponent.addNote();
      expect(spy).toHaveBeenCalled();
    });

    test('on note select', () => {
      notesComponent.selectNote(0);
      expect(spy).toHaveBeenCalled();
    });

    test('on note remove', () => {
      notesComponent.removeNote(0);
      expect(spy).toHaveBeenCalled();
    });
  });

});
