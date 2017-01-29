import findMutualParent from './findMutualParent';

describe('findMutualParent', () => {
  it('should output latest index if both branches are same', () => {
    let branches = [{
      id: 'aaaa',
      parent: 1,
    }, {
      id: 'bbbb',
      parent: 2,
    }, {
      id: 'cccc',
      parent: 3,
    }];
    expect(findMutualParent(branches, branches)).toEqual(2);
  });
});
