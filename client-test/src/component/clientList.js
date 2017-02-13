import React, { Component, PropTypes } from 'react';

import style from './clientList.css';

export default class ClientList extends Component {
  render() {
    const { clients, onAdd, onRemove } = this.props;
    return (
      <ul className={style.clientList}>
        { clients.map((client, id) => (
          <li key={id} onClick={onRemove.bind(null, id)}>A client</li>
        ))}
        <li onClick={onAdd}>Create new...</li>
      </ul>
    );
  }
}

ClientList.propTypes = {
  clients: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};
