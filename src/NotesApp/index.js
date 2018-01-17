import React, { Component, Fragment } from 'react';
import NotesMenu from './components/NotesMenu/';
import NoteView from './components/NoteView/';
import './styles.scss';

class Notes extends Component {
  constructor() {
    super();

    this.state = {
      notes: [''],
      selectedNoteIndex: 0
    };

    this.handleAddBtnPress = this.handleAddBtnPress.bind(this);
    this.handleNoteRemoveBtnPress = this.handleNoteRemoveBtnPress.bind(this);
    this.handleNoteSelect = this.handleNoteSelect.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);

    this.noteView = null;
  }

  handleNoteChange(value) {
    const notes = this.state.notes.slice();
    notes[this.state.selectedNoteIndex] = value;
    this.setState({ notes });
  }

  handleNoteRemoveBtnPress(index) {
    const notes = this.state.notes.slice(0, index).concat(this.state.notes.slice(index + 1));
    let selectedNoteIndex = this.state.selectedNoteIndex;

    if (notes.length === 0) {
      notes.push('');
    } else {
      selectedNoteIndex = selectedNoteIndex === 0 ? 0 : selectedNoteIndex - 1;
    }

    if (this.noteView) this.noteView.focusTextArea();

    this.setState({
      notes,
      selectedNoteIndex
    });
  }

  handleNoteSelect(index) {
    if (this.noteView) {
      this.noteView.focusTextArea();
    }

    this.setState({
      selectedNoteIndex: index
    });
  }

  handleAddBtnPress() {
    const notes = this.state.notes.slice();

    notes.push('');

    if (this.noteView) {
      this.noteView.focusTextArea();
    }

    this.setState({
      notes,
      selectedNoteIndex: notes.length - 1
    });
  }

  render() {
    const { notes, selectedNoteIndex } = this.state;

    return (
      <Fragment>
        <NotesMenu
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          onNoteSelect={this.handleNoteSelect}
          onNoteRemoveBtnPress={this.handleNoteRemoveBtnPress}
          onAddBtnPress={this.handleAddBtnPress}
        />
        <NoteView
          ref={noteView => { this.noteView = noteView; }}
          noteValue={notes[selectedNoteIndex]}
          onNoteChange={this.handleNoteChange}
        />
      </Fragment>
    );
  }
}

export default Notes;
