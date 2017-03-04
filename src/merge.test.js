import merge from './merge';

const smallestFinder = (a, b) => {
  if (a == null) return 1;
  if (b == null) return -1;
  return a.id - b.id;
};

describe('merge', () => {
  it('should put transactions in order', () => {
    let branches = [0, 2, 4].map(v => ({ id: v, parent: 1 }));
    let branches2 = [0, 1, 3, 5].map(v => ({ id: v, parent: 1 }));
    let output = merge(branches, branches2, smallestFinder, () => ({ id: 6 }));
    console.log(output);
  });
  it('should process fast forward in 3 branches', () => {
    let branches1 = [{ id: 0, parent: 1 }];
    let branches2 = [{ id: 1, parent: 1 }];
    let branches3 = [{ id: 2, parent: 1 }];
    branches1 = branches2 = merge(branches1, branches2,
      smallestFinder, () => ({ id: 3 }));
    branches2 = branches3 = merge(branches2, branches3,
      smallestFinder, () => ({ id: 4 }));
    branches1 = branches2 = merge(branches1, branches2,
      smallestFinder, () => ({ id: 5 }));
    expect(branches1).toEqual([
      { id: 0, parent: 1 },
      { id: 1, parent: 2 },
      { id: 2, parent: 3 },
      { id: 3, parent: [3, 2] },
      { id: 4, parent: [1, 2] },
    ]);
  });
});
