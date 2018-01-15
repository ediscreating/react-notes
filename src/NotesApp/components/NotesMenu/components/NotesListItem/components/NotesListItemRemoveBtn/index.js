import React from 'react';
import RemoveButton from 'RemoveButton/';
import iconColorOnBtnState from 'HOC/iconColorOnBtnState/';

const WrappedButton = iconColorOnBtnState(RemoveButton, {
  default: 'mid-grey',
  focus: 'white',
  hover: 'white'
});

function NotesListItemRemoveBtn(props) {
  return (
    <WrappedButton {...props} round/>
  );
}

export default NotesListItemRemoveBtn;
