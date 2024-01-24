import * as rbTree from '../lib/red-black-tree';
import { list } from '../lib/list';

// useful constants for several tests
const init_tree: rbTree.RBTreeNode<string> = rbTree.insert(rbTree.make_empty_tree(), 5, "a");
const large_tree = rbTree.build_tree(list([1, "a"], [3, "b"], [5, "c"], [7, "d"],
[9, "e"], [11, "f"], [13, "g"]));

test("Tree with single element is black", () => {
    //if (!rbTree.is_empty_tree(init_tree) && rbTree.get_all_keys(init_tree).length == 2) {
        expect(rbTree.is_red(init_tree)).toBe(false);
    //}
});
test("Tree with two elements has a red leaf", () => {

});
test("Search retrieves the correct element", () => {
    expect(rbTree.search(large_tree, 5)).toBe("c");
});