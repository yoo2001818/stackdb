// @flow
import type { Branch } from './branch';

export default function merge(merger: Branch, mergee: Branch,
  conflictDetector: Function, orderer: Function,
): Branch {
  // No-op for now
  return merger;
}
