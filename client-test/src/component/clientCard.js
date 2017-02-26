import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import style from './clientList.css';

const COLOR_TABLE = [style.blue, style.red, style.green, style.orange,
  style.black];

function join(parent) {
  if (Array.isArray(parent)) return parent.join(',');
  return parent;
}

export default class ClientCard extends Component {
  render() {
    const { client, index, time, onAction } = this.props;
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
              {[style.transaction]: transaction != null},
              transaction && COLOR_TABLE[transaction.color]
            )}>
              {transaction && (
                <span className={style.parent}>
                  {join(transaction.parent)}
                </span>
              )}
            </td>
          );
        })}
        <td className={style.commit}>
          <button className={style.commitButton} onClick={onAction.bind(null, {
            type: 'clientCommit',
          })} />
        </td>
        <td className={style.merge}>
          <button className={style.mergeButton} onClick={onAction.bind(null, {
            type: 'clientMerge',
            targetId: index + 1,
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
  index: PropTypes.number,
  time: PropTypes.number,
  onAction: PropTypes.func,
};
