// @flow
import type { Branch } from './branch';
import findMutualParent from './branch/findMutualParent';

export default function merge(merger: Branch, mergee: Branch,
  orderer: (a: Transaction, b: Transaction) => Number,
  createMergeTransaction: () => Transaction,
): Branch {
  let source = [merger, mergee];
  let mapping = [[], []];
  let fastForward = false;
  // If we have a transaction after smaller branch's last transaction, consider
  // it a fast forward
  {
    let smallest, biggest;
    if (merger.length > mergee.length) {
      smallest = mergee;
      biggest = merger;
    } else {
      smallest = merger;
      biggest = mergee;
    }
    let smallestLast = smallest[smallest.length - 1] || {};
    for (let i = biggest.length - 1; i >= 0; --i) {
      if (biggest[i].id === smallestLast.id) {
        fastForward = true;
        break;
      }
    }
  }
  let mutualIndex = findMutualParent(merger, mergee);
  if (mutualIndex == null) mutualIndex = -1;
  let indexes = [mutualIndex + 1, mutualIndex + 1];
  let output = merger.slice(0, mutualIndex + 1);
  function getIndex(selectedMapping, index) {
    if (mutualIndex > index) return index;
    return selectedMapping[index];
  }
  console.log(mutualIndex, output);
  console.log(merger, mergee);
  mapping.forEach(v => v[-1] = -1);
  mapping.forEach(v => v[mutualIndex] = mutualIndex);
  while (indexes.some((v, i) => v < source[i].length)) {
    let order = orderer(source[0][indexes[0]], source[1][indexes[1]]);
    let selected = order < 0 ? 0 : 1;
    let selectedMapping = mapping[selected];
    let selectedIndex = indexes[selected];
    let selectedSource = source[selected];
    let transaction = selectedSource[selectedIndex];
    let parent = transaction.parent;
    if (Array.isArray(parent)) {
      parent = parent.map(v =>
        output.length - getIndex(selectedMapping, selectedIndex - v));
    } else {
      parent = output.length -
        getIndex(selectedMapping, selectedIndex - parent);
    }
    // Push transaction to output
    output.push(Object.assign({}, transaction, { parent }));
    // Increment indexes with same transaction ID.
    indexes = indexes.map((index, i) => {
      let target = source[i][index];
      if (target != null && target.id === transaction.id) {
        // Set the mapping to current.
        mapping[i][index] = output.length - 1;
        return index + 1;
      }
      return index;
    });
  }
  // Create merge transaction
  if (!fastForward) {
    let merged = createMergeTransaction();
    merged.parent = mapping.map((v, i) => output.length - v[indexes[i] - 1]);
    output.push(merged);
  }
  console.log(output);
  // Done!
  return output;
}
