import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import style from './clientList.css';

export default class ClientCard extends Component {
  render() {
    const { client, time, onAction } = this.props;
    return (
      <tr className={style.clientCard}>
        <td className={style.header}>
          <div className={style.content}>
            <span className={style.title}>
              { client.id }
            </span>
            {' '}
            <button className={style.remove} onClick={onAction.bind(null, {
              type: 'clientRemove',
            })} />
          </div>
        </td>
        {Array.from({ length: time }).map((_, i) => {
          let transaction = client.transactions.find(v => v.id === i);
          return (
            <td key={i} className={classNames(style.timeFrame,
              {[style.transaction]: transaction != null})}>
              {transaction && 'Transaction'}
            </td>
          );
        })}
        <td className={style.commit}>
          <button className={style.commitButton} onClick={onAction.bind(null, {
            type: 'clientCommit',
          })} />
        </td>
      </tr>
    );
  }
}

ClientCard.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number,
  }),
  time: PropTypes.number,
  onAction: PropTypes.func,
};
