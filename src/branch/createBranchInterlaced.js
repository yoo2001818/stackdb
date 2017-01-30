// @flow
import type { Transaction, Branch } from './index';

type BranchModel = Array<Transaction, BranchModel[]>;

export default function createBranchInterlaced(
  transactions: BranchModel
): Branch {
  let flattened: Transaction = [];
  let parents: void | Number[];
  transactions.forEach(transaction => {
    if (Array.isArray(transaction)) {
      let branches = transaction;
      let indices = branches.map(() => 0);
      let insertIndices = branches.map(() => flattened.length - 1);
      // Look up each branches; Push each transaction into flattened array.
      while (branches.reduce((prev, branch, i) => {
        let index = indices[i];
        if (index >= branch.length) return prev;
        flattened.push(Object.assign({
          parent: flattened.length - insertIndices[i],
        }, branch[index]));
        indices[i] ++;
        insertIndices[i] = flattened.length - 1;
        return true;
      }, false));
      parents = insertIndices;
    } else {
      if (transaction.parent != null) {
        flattened.push(transaction);
      } else {
        let parent;
        if (parents != null) parent = parents.map(v => flattened.length - v);
        else parent = 1;
        flattened.push(Object.assign({ parent }, transaction));
        parents = null;
      }
    }
  });
  return flattened;
}
