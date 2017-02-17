import React, { Component, PropTypes } from 'react';

import ClientCard from './clientCard';

import style from './clientList.css';

export default class ClientList extends Component {
  render() {
    const { clients, time, onAdd, update } = this.props;
    return (
      <div className={style.clientList}>
        <table>
          <thead>
            <tr>
              <td className={style.header} />
              {Array.from({ length: time }).map((_, i) => (
                <td className={style.timeFrame} key={i}>{i}</td>
              ))}
              <td className={style.commit} />
            </tr>
          </thead>
          <tbody>
            {clients.map((client, id) => (
              <ClientCard key={id} client={client} time={time}
                onAction={data => update(Object.assign({ id }, data))} />
            ))}
          </tbody>
        </table>
        <div className={style.addButton}>
          <button onClick={onAdd}>Create new...</button>
        </div>
      </div>
    );
  }
}

ClientList.propTypes = {
  clients: PropTypes.array,
  time: PropTypes.number,
  onAdd: PropTypes.func,
  update: PropTypes.func,
};
