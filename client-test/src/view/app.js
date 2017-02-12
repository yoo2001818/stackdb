import React, { Component, PropTypes } from 'react';

import ClientList from '../component/clientList';

import { app as appClass } from './app.css';

export default class App extends Component {
  render() {
    return (
      <div className={appClass}>
        <ClientList />
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    clients: PropTypes.array,
  }).isRequired,
  update: PropTypes.func.isRequired,
};
