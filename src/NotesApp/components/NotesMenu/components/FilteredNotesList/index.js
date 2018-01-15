import React from 'react';
import PropTypes from 'prop-types';
import { List } from  'List/';
import NotesListItem from '../NotesListItem/';

function FilteredNotesList({ notes, onNoteSelect, onNoteRemoveBtnPress, selectedNoteIndex  }) {
  function handleNoteSelect(index) {
    if (onNoteSelect) onNoteSelect(index);
  }

  function handleNoteRemoveBtnPress(e) {
    e.stopPropagation();
    if (onNoteRemoveBtnPress) onNoteRemoveBtnPress(this);
  }

  return (
    <List>
      {notes && notes.map((note, i) => (
        <NotesListItem
          key={note.index}
          title={note.text}
          onRemoveBtnPress={handleNoteRemoveBtnPress.bind(note.index)}
          onSelect={handleNoteSelect.bind(null, note.index)}
          selected={selectedNoteIndex === note.index} />
      ))}
    </List>
  );
}

FilteredNotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number,
    text: PropTypes.string
  })),
  onNoteSelect: PropTypes.func,
  onNoteRemoveBtnPress: PropTypes.func,
  selectedNoteIndex: PropTypes.number
};

export default FilteredNotesList;
