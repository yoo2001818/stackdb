// @flow

export type Transaction = {
  id: string,
  parent: void | number | number[],
};

export type Branch = Transaction[];
