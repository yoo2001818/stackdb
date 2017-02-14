export default {
  init: () => [],
  clientAdd: (action, state) => state.concat([
    Object.assign({ id: state.length }, action.data),
  ]),
  clientRemove: (action, state) => state.filter((_, id) => action.id !== id),
};
