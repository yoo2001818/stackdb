// @flow
import type { Branch } from './branch';
import findMutualParent from './branch/findMutualParent';

export default function merge(merger: Branch, mergee: Branch,
  conflictDetector: Function,
  orderer: (transactions: Transaction[]) => Number,
  createMergeTransaction: () => Transaction,
): Branch {
  let source = [merger, mergee];
  let mapping = [[], []];

  let mutualIndex = findMutualParent(merger, mergee);
  if (mutualIndex == null) mutualIndex = -1;
  let indexes = [mutualIndex + 1, mutualIndex + 1];
  let output = merger.slice(0, mutualIndex + 1);
  console.log(mutualIndex, output);
  console.log(merger, mergee);
  mapping.forEach(v => v[-1] = -1);
  mapping.forEach(v => v[mutualIndex] = mutualIndex);
  while (indexes.some((v, i) => v < source[i].length)) {
    let selected = orderer(source.map((v, i) => v[indexes[i]]));
    let selectedMapping = mapping[selected];
    let selectedIndex = indexes[selected];
    let selectedSource = source[selected];
    let transaction = selectedSource[selectedIndex];
    let parent = transaction.parent;
    if (Array.isArray(parent)) {
      parent = parent.map(v =>
        output.length - selectedMapping[selectedIndex - v]);
    } else {
      parent = output.length - selectedMapping[selectedIndex - parent];
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
  let merged = createMergeTransaction();
  merged.parent = mapping.map((v, i) => output.length - v[indexes[i] - 1]);
  output.push(merged);
  console.log(output);
  // Done!
  return output;
}
