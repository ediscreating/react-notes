import React from 'react';
import AddButton from 'AddButton/';
import iconColorOnBtnState from 'HOC/iconColorOnBtnState/';

const WrappedButton = iconColorOnBtnState(AddButton, {
  default: 'mint',
  focus: 'white',
  hover: 'white'
});

function NotesAddButton(props) {
  return (
    <div className="notes__add-btn">
      <WrappedButton {...props} round/>
    </div>
  );
}

export default NotesAddButton;
