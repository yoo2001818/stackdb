import findMutualParent from './findMutualParent';

describe('findMutualParent', () => {
  it('should output latest index if both branches are same', () => {
    let branches = [{
      id: 'aaaa',
      parent: 1,
    }, {
      id: 'bbbb',
      parent: 1,
    }, {
      id: 'cccc',
      parent: 1,
    }];
    expect(findMutualParent(branches, branches)).toEqual(2);
  });
});
