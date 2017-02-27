import createBranchInterlaced from './createBranchInterlaced';
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
    expect(findMutualParent(branches, branches)).toBe(2);
  });
  it('should output mutual parent', () => {
    let branches = ['aaaa', 'bbbb', 'cccc'].map(v => ({ id: v }));
    let branches2 = createBranchInterlaced(
      branches.concat(['ddd', 'eee'].map(v => ({ id: v }))));
    let branches3 = createBranchInterlaced(
      branches.concat(['fff', 'ggg', 'hhh'].map(v => ({ id: v }))));
    expect(findMutualParent(branches2, branches3)).toBe(2);
  });
  it('should output mutual parent even if there are branches', () => {
    let mutual = [...'123k'].map(v => ({ id: v }));
    let branches1 = [...'abc'].map(v => ({ id: v }));
    let branches2 = [...'def'].map(v => ({ id: v }));
    let branches3 = createBranchInterlaced(
      mutual.concat([[branches1, branches2], {id: 'baa'}]));
    let branches4 = createBranchInterlaced(mutual.concat([{id: 'nom'}]));
    expect(findMutualParent(branches3, branches4)).toBe(3);
  });
  it('Regression test', () => {
    let branches1 = createBranchInterlaced([2, 5].map(v => ({ id: v })));
    let branches2 = [0, 3].map(v => ({ id: v }));
    let branches3 = [1, 4].map(v => ({ id: v }));
    let branches4 = createBranchInterlaced(
      [[branches2, branches3], {id: 6}]);
    expect(findMutualParent(branches4, branches1)).toBe(null);
  });
});
