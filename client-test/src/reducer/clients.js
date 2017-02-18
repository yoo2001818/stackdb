export default {
  init: () => [],
  clientAdd: (action, state) => state.concat([
    Object.assign({ id: Math.random() * 9999 | 0,
      transactions: [] }, action.data),
  ]),
  clientRemove: (action, state) => state.filter((_, id) => action.id !== id),
  clientCommit: (action, state, globalState) => state.map((v, id) => {
    if (id !== action.id) return v;
    return Object.assign({}, v, {
      transactions: v.transactions.concat([{
        id: globalState.time.current,
      }]),
    });
  }),
  clientMerge: (action, state) => state,
};
