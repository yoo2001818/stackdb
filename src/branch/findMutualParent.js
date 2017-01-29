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
}
