export default {
  init: () => [],
  clientAdd: (action, state) => state.concat([action.data]),
  clientRemove: (action, state) => state.filter((_, id) => action.id !== id),
};
