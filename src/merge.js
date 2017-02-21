// @flow
import type { Branch } from './branch';
import findMutualParent from './branch/findMutualParent';

export default function merge(merger: Branch, mergee: Branch,
  conflictDetector: Function, orderer: (mergee: Branch,
    transaction: Transaction) => Number,
): Branch {
  // Slice the merger and mergee to the mutual parent.
  let mutualIndex = findMutualParent(merger, mergee);
  let mergerTemp = merger.slice(mutualIndex + 1);
  // Create some kind of linked list. We need to create reverse index to
  // preserve the parent links while inserting transactions.
  let mergeeTemp = mergee.slice(mutualIndex + 1);
  // Read each transaction from merger and push into mergee
  mergerTemp.forEach(transaction => {
    let position = orderer(mergeeTemp, transaction);
    // TODO Push it to mergee, while keeping other transaction's parent
    // indexes
  });
  // TODO Create merge transaction
  // Done! Change the internal format to arrays.
  return mergee;
}
