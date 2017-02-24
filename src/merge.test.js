import merge from './merge';

describe('merge', () => {
  it('should put transactions in order', () => {
    let branches = [0, 2, 4].map(v => ({ id: v, parent: 1 }));
    let branches2 = [0, 1, 3, 5].map(v => ({ id: v, parent: 1 }));
    let output = merge(branches, branches2, null,
      arr => {
        let smallest = arr.findIndex(v => v != null);
        arr.forEach((v, i) => {
          if (v != null && v.id < arr[smallest].id) smallest = i;
        });
        return smallest;
      }, () => ({ id: 6 })
    );
    console.log(output);
  });
});
