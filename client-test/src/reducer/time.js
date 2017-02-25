export default {
  init: () => ({ current: 0 }),
  clientCommit: (action, state) => Object.assign({}, state, {
    current: state.current + 1,
  }),
  clientMerge: (action, state) => Object.assign({}, state, {
    current: state.current + 1,
  }),
};
