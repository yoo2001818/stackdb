import merge from 'stackdb/merge';

export default {
  init: () => [],
  clientAdd: (action, state) => state.concat([
    Object.assign({
      id: Math.random() * 9999 | 0,
      color: state.length % 4,
      transactions: [],
    }, action.data),
  ]),
  clientRemove: (action, state) => state.filter((_, id) => action.id !== id),
  clientCommit: (action, state, globalState) => state.map((v, id) => {
    if (id !== action.id) return v;
    return Object.assign({}, v, {
      transactions: v.transactions.concat([{
        id: globalState.time.current,
        color: v.color,
        parent: 1,
      }]),
    });
  }),
  clientMerge: (action, state, globalState) => {
    let master = state[action.id];
    let slave = state[action.targetId];
    let merged = merge(master.transactions, slave.transactions, null,
      arr => {
        let smallest = arr.findIndex(v => v != null);
        arr.forEach((v, i) => {
          if (v != null && v.id < arr[smallest].id) smallest = i;
        });
        return smallest;
      }, () => ({ id: globalState.time.current, parent: 1, color: 4 })
    );
    console.log(merged);
    let newState = state.slice();
    newState[action.id] = Object.assign({}, master, { transactions: merged });
    newState[action.targetId] = Object.assign({}, slave,
      { transactions: merged });
    return newState;
  },
};
