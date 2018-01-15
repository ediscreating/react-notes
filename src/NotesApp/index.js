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

    this.setState({
      notes,
      selectedNoteIndex
    });
  }

  handleNoteSelect(index) {
    this.setState({
      selectedNoteIndex: index
    });
  }

  handleAddBtnPress() {
    const notes = this.state.notes.slice();

    notes.push('');

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
          noteValue={notes[selectedNoteIndex]}
          onNoteChange={this.handleNoteChange}
        />
      </Fragment>
    );
  }
}

export default Notes;
