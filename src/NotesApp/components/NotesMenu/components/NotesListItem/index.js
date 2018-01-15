import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'List/';
import NotesListItemRemoveBtn from './components/NotesListItemRemoveBtn/';

function NotesListItem({ onSelect, onRemoveBtnPress, ...props }) {
  return (
    <ListItem
      {...props}
      tabIndex={0}
      onClick={onSelect}
      rightElement={<NotesListItemRemoveBtn
                      onFocus={e => e.stopPropagation()}
                      onPress={onRemoveBtnPress}
                    />}
      titleIsOnOneLine
    />
  );
}

NotesListItem.propTypes = {
  title: PropTypes.string,
  onSelect: PropTypes.func,
  onRemoveBtnPress: PropTypes.func
};

export default NotesListItem;
