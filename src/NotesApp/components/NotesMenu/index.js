import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExpandingSearch from 'ExpandingSearch/';
import NotesList from './components/NotesList';
import FilteredNotesList from './components/FilteredNotesList';
import NotesAddButton from './components/NotesAddButton/';

class NotesMenu extends PureComponent {
  constructor() {
    super();

    this.state = {
      searchValue: '',
      filteredNotes: []
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  filterNotes(notes, filterValue) {
    const indexes = [];

    return notes.filter((note, i) => {
      if (
        i === this.props.selectedNoteIndex ||
        note.trim() === '' ||
        note.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
      ) {
        indexes.push(i);
        return true;
      }
    }).map((filteredNote, i) => {
      return {
        index: indexes[i],
        text: filteredNote
      };
    });
  }

  handleSearchChange(value) {
    const filteredNotes = value.length > 0 ?
                          this.filterNotes(this.props.notes, value) :
                          [];

    this.setState({
      searchValue: value,
      filteredNotes
    });
  }

  handleNoteSelect(index) {
    if (this.props.onNoteSelect) {
      this.props.onNoteSelect(index);
    }
  }

  componentWillReceiveProps(nextProps) {
    const searchValue = this.state.searchValue;

    if (this.props.notes !== nextProps.notes && searchValue.length > 0) {
      this.setState({
        filteredNotes: this.filterNotes(nextProps.notes, searchValue)
      });
    }
  }

  render() {
    const {
      notes,
      selectedNoteIndex,
      onAddBtnPress,
      onNoteRemoveBtnPress,
      onNoteSelect
    } = this.props;

    const { searchValue, filteredNotes } = this.state;

    return (
      <div className="notes__menu">
        <div className="notes__menu-header">
          <div className="notes__search">
            <ExpandingSearch value={searchValue} onChange={this.handleSearchChange}/>
          </div>
          <NotesAddButton onPress={onAddBtnPress}/>
        </div>
        {
          notes && (
            filteredNotes.length > 0 ?
            <FilteredNotesList {...{
                notes: filteredNotes,
                onNoteSelect,
                onNoteRemoveBtnPress,
                selectedNoteIndex
              }}
            /> :
            <NotesList {...{
                notes,
                onNoteSelect,
                onNoteRemoveBtnPress,
                selectedNoteIndex
              }}
            />
          )
        }
      </div>
    );
  }
}

NotesMenu.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string),
  onAddBtnPress: PropTypes.func,
  onNoteSelect: PropTypes.func,
  onNoteRemoveBtnPress: PropTypes.func,
  selectedNoteIndex: PropTypes.number
};

export default NotesMenu;
