import React, { Component, PropTypes } from 'react';

import ClientCard from './clientCard';

import style from './clientList.css';

export default class ClientList extends Component {
  render() {
    const { clients, onAdd, onRemove } = this.props;
    return (
      <div className={style.clientList}>
        <ul>
          { clients.map((client, id) => (
            <ClientCard key={id} client={client}
              onRemove={onRemove.bind(null, id)} />
          ))}
        </ul>
        <div className={style.addButton}>
          <button onClick={onAdd}>Create new...</button>
        </div>
      </div>
    );
  }
}

ClientList.propTypes = {
  clients: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};
