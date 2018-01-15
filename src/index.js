import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import NotesApp from './NotesApp/';

import './styles/base.scss';

const render = (Component, container) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    container
  )
}

const root = document.createElement('div');
root.className = 'notes';
document.body.appendChild(root);

render(NotesApp, root);

if (module.hot) {
  module.hot.accept('./NotesApp/', () => {
    render(NotesApp, root);
  })
}
