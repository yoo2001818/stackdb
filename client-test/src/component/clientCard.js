import React, { Component, PropTypes } from 'react';

import style from './clientCard.css';

export default class ClientCard extends Component {
  render() {
    const { client, onRemove } = this.props;
    return (
      <li className={style.clientCard}>
        <div className={style.header}>
          <span className={style.title}>
            { client.id }
          </span>
          <button className={style.remove} onClick={onRemove} />
        </div>
      </li>
    );
  }
}

ClientCard.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number,
  }),
  onRemove: PropTypes.func,
};
