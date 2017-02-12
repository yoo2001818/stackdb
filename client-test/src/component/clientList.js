import React, { Component, PropTypes } from 'react';

export default class ClientList extends Component {
  render() {
    const { clients } = this.props;
    return (
      <div>
        Client List
      </div>
    );
  }
}

ClientList.propTypes = {
  clients: PropTypes.array,
  addClient: PropTypes.func,
};
