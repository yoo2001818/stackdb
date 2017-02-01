// @flow
import type { Branch } from './index';

// A local version of finding mutual parent. This could be done using
// pagination to prevent loading whole transaction list to find mutual
// parent.

// This'll output a transaction index, since transactions before the
// mutual parents are guarrenteed to share the index between branches.

export default function findMutualParent(
  branch1: Branch,
  branch2: Branch,
): Number {
  let index1 = branch1.length - 1;
  let index2 = branch2.length - 1;
  let toggle = false;
  while ((index1 >= 0 && index2 >= 0) &&
    branch1[index1].id !== branch2[index2].id
  ) {
    if (toggle) {
      if (index1 >= index2) {
        let parent = branch1[index1].parent;
        if (Array.isArray(parent)) index1 -= parent[0];
        else index1 -= parent;
      }
    } else {
      if (index2 >= index1) {
        let parent = branch2[index2].parent;
        if (Array.isArray(parent)) index2 -= parent[0];
        else index2 -= parent;
      }
    }
    toggle = !toggle;
  }
  return index2;
}
