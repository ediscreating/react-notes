import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'List/';
import NotesListItem from '../NotesListItem/';

function NotesList({ notes, onNoteSelect, onNoteRemoveBtnPress, selectedNoteIndex }) {
  function handleNoteSelect() {
    if (onNoteSelect) onNoteSelect(this);
  }

  function handleNoteRemoveBtnPress(e) {
    e.stopPropagation();
    if (onNoteRemoveBtnPress) onNoteRemoveBtnPress(this);
  }

  return (
    <List>
      {notes && notes.map((note, i) => (
        <NotesListItem
          key={i}
          title={note}
          onSelect={handleNoteSelect.bind(i)}
          onRemoveBtnPress={handleNoteRemoveBtnPress.bind(i)}
          selected={selectedNoteIndex === i} />
      ))}
    </List>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string),
  onNoteSelect: PropTypes.func,
  onNoteRemoveBtnPress: PropTypes.func,
  selectedNoteIndex: PropTypes.number
};

export default NotesList;
