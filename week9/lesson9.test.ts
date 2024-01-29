import { is_empty_tree, is_red, build_tree, search,
         insert, make_empty_tree, left_branch, right_branch,
         RBTreeNode, RBTree } from '../lib/red-black-tree';
import { list } from '../lib/list';

// useful constants for several tests
const init_tree: RBTreeNode<string> = insert(make_empty_tree(), 5, "a");
const large_tree = build_tree(list([1, "a"], [3, "b"], [5, "c"], [7, "d"],
[9, "e"], [11, "f"], [13, "g"]));

test("Tree with single element is black", () => {
        expect(is_red(init_tree)).toBe(false);
});
test("Tree with two elements has a red leaf", () => {
    const tree: RBTreeNode<string> = insert(init_tree, 4, "b");
    const leaf: RBTree<string> = left_branch(tree);
    expect(!is_empty_tree(leaf) && is_red(leaf)).toBe(true);
});
test("Search retrieves the correct element", () => {
    expect(search(large_tree, 5)).toBe("c");
    expect(search(large_tree, 50)).toBe(undefined);
});

test('tree equality', () => {
    const tree1 = insert(insert(init_tree, 3, "b"), 7, "c");
    const tree2 = insert(insert(init_tree, 3, "b"), 7, "c");
    expect(tree1).not.toBe(tree2);
    expect(tree1).toStrictEqual(tree2);
    });