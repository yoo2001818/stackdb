import type { Transaction } from './branch';

export type Database = {
  transactions: Transaction[],
  state: State,
};

export type State = mixed;
