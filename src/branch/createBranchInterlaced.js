// @flow
import type { Transaction, Branch } from './index';

type BranchModel = Array<Transaction | BranchModel[]>;

export default function createBranchInterlaced(
  transactions: BranchModel
): Branch {
  let flattened: Branch = [];
  let parents: void | Number[];
  transactions.forEach(transaction => {
    if (Array.isArray(transaction)) {
      let branches = transaction.map(createBranchInterlaced);
      let indices = branches.map(() => 0);
      let insertIndices = branches.map(() => [flattened.length - 1]);
      // Look up each branches; Push each transaction into flattened array.
      while (branches.reduce((prev, branch, i) => {
        let index = indices[i];
        if (index >= branch.length) return prev;
        let parentValues;
        if (Array.isArray(branch[index].parent)) {
          parentValues = branch[index].parent.map(v => flattened.length -
            insertIndices[i][index - v + 1]);
        } else {
          parentValues = flattened.length -
            insertIndices[i][index - (branch[index].parent || 1) + 1];
        }
        flattened.push(Object.assign({}, branch[index], {
          parent: parentValues,
        }));
        indices[i] ++;
        insertIndices[i].push(flattened.length - 1);
        return true;
      }, false));
      parents = insertIndices.map(v => v[v.length - 1]);
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
  if (parents != null) {
    throw new Error('Merging transaction must be specified');
  }
  return flattened;
}
