import React, { Component, PropTypes } from 'react';

import ClientList from '../component/clientList';

import style from './app.css';

export default class App extends Component {
  render() {
    const { state: { clients }, update } = this.props;
    return (
      <div className={style.app}>
        <ClientList clients={clients} onAdd={() => update({
          type: 'clientAdd',
          data: {},
        })} />
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
