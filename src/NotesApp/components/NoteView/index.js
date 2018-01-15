import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NoteView extends PureComponent {
  constructor(props) {
    super(props);

    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleNoteChange(e) {
    if (this.props.onNoteChange) {
      this.props.onNoteChange(e.target.value);
    }
  }

  render() {
    return (
      <div className="notes__note-view">
        <textarea
          className="notes__note-edit"
          value={this.props.noteValue}
          onChange={this.handleNoteChange}
        />
      </div>
    );
  }
}

NoteView.propTypes = {
  noteValue: PropTypes.string,
  onNoteChange: PropTypes.func
};

export default NoteView;
