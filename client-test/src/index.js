import React from 'react';
import { render } from 'react-dom';

import App from './view/app';
import * as reducers from './reducer';

// Create container element
let container = document.createElement('div');
document.body.appendChild(container);
container.className = 'root';

// Create state
// I could have used redux, but I wanted to make it simple as possible.
let state = {};

function updateStore(action) {
  let newState = {};
  for (let key in reducers) {
    let handler = reducers[key][action.type];
    if (handler != null) newState[key] = handler(action, state[key], state);
    else newState[key] = state[key];
  }
  state = newState;
  render(<App state={state} update={updateStore} />, container);
}

updateStore({ type: 'init' });
