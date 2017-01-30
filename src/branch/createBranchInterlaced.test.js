import createBranchInterlaced from './createBranchInterlaced';

describe('createBranchInterlaced', () => {
  it('should set parents if not set', () => {
    let branches = ['aaaa', 'bbbb', 'cccc'].map(v => ({ id: v }));
    expect(createBranchInterlaced(branches)).toEqual([
      { id: 'aaaa', parent: 1 },
      { id: 'bbbb', parent: 1 },
      { id: 'cccc', parent: 1 },
    ]);
  });
  it('should retain parents if set', () => {
    let branches = ['aaaa', 'bbbb', 'cccc'].map(v => ({ id: v, parent: 2 }));
    expect(createBranchInterlaced(branches)).toEqual([
      { id: 'aaaa', parent: 2 },
      { id: 'bbbb', parent: 2 },
      { id: 'cccc', parent: 2 },
    ]);
  });
  it('should put transactions in interlaced order', () => {
    let branches1 = ['aaaa', 'bbbb', 'cccc'].map(v => ({ id: v }));
    let branches2 = ['dddd', 'eeee', 'ffff'].map(v => ({ id: v }));
    expect(createBranchInterlaced([[branches1, branches2], {
      id: 'oooo',
    }])).toEqual([
      { id: 'aaaa', parent: 1 },
      { id: 'dddd', parent: 2 },
      { id: 'bbbb', parent: 2 },
      { id: 'eeee', parent: 2 },
      { id: 'cccc', parent: 2 },
      { id: 'ffff', parent: 2 },
      { id: 'oooo', parent: [2, 1] },
    ]);
  });
  it('should throw an error if merging transaction does not exists', () => {
    let branches1 = ['aaaa', 'bbbb', 'cccc'].map(v => ({ id: v }));
    let branches2 = ['dddd', 'eeee', 'ffff'].map(v => ({ id: v }));
    expect(() => createBranchInterlaced([[branches1, branches2]])).toThrow();
  });
});
