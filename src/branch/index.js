// @flow

export type Transaction = {
  id: string,
  parent: number | number[],
};

export type Branch = Transaction[];
