import { make_empty_tree, is_empty_tree } from '../lib/red-black-tree';

test('empty tree is indeed empty', () => {
    expect(is_empty_tree(make_empty_tree())).toBe(true);
});