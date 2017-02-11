import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  render() {
    const { counter } = this.props.state;
    return (
      <div>
        <p>Hello, world!</p>
        <p>I am a counter: {counter}</p>
        <p>
          <button onClick={() => this.props.update({ type: 'increment' })}>
            Increment
          </button>
          <button onClick={() => this.props.update({ type: 'reset' })}>
            Reset
          </button>
        </p>
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({
    counter: PropTypes.number,
  }).isRequired,
  update: PropTypes.func.isRequired,
};
