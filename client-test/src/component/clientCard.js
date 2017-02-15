import React, { Component, PropTypes } from 'react';

import style from './clientCard.css';

export default class ClientCard extends Component {
  render() {
    const { client, onAction } = this.props;
    return (
      <li className={style.clientCard}>
        <div className={style.header}>
          <span className={style.title}>
            { client.id }
          </span>
          <button className={style.remove} onClick={onAction.bind(null, {
            type: 'clientRemove',
          })} />
        </div>
        <ul className={style.transactions}>
          { client.transactions.map((transaction) => (
            <li key={transaction.id} className={style.transaction}>
              Transaction
            </li>
          ))}
        </ul>
        <button className={style.commit} onClick={onAction.bind(null, {
          type: 'clientCommit',
        })} />
      </li>
    );
  }
}

ClientCard.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number,
  }),
  onAction: PropTypes.func,
};
