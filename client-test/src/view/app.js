import React, { Component, PropTypes } from 'react';

import ClientList from '../component/clientList';

import style from './app.css';

export default class App extends Component {
  render() {
    const { state: { clients, time: { current } }, update } = this.props;
    return (
      <div className={style.app}>
        <ClientList clients={clients} time={current}
          onAdd={() => update({ type: 'clientAdd', data: {} })}
          update={update}
        />
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
