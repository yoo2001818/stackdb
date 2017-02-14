import React, { Component, PropTypes } from 'react';

import ClientCard from './clientCard';

import style from './clientList.css';

export default class ClientList extends Component {
  render() {
    const { clients, onAdd, onRemove } = this.props;
    return (
      <ul className={style.clientList}>
        { clients.map((client, id) => (
          <ClientCard key={id} client={client}
            onRemove={onRemove.bind(null, id)} />
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
