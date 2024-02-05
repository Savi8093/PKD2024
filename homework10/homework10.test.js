"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// extend as needed
var list_1 = require("../lib/list");
var homework10_1 = require("./homework10");
var test_graph = {
    size: 7,
    adj: [(0, list_1.list)(1, 2), (0, list_1.list)(3, 5), (0, list_1.list)(3, 4), (0, list_1.list)(4),
        (0, list_1.list)(5), (0, list_1.list)(6), (0, list_1.list)()]
};
// TASK 1: write 5 unit tests to test shortest_paths
test('Returns no path', function () {
    expect((0, homework10_1.shortest_paths)(test_graph, 3, 1)).toEqual((0, list_1.list)());
});
test('Shortest path from node 1 to 4 should be 1-3-4', function () {
    var expected_path = [0, 3, [1, 3, 4]];
    expect((0, homework10_1.shortest_paths)(test_graph, 1, 4)).toEqual((0, list_1.list)(expected_path));
});
test('Shortest path from node 0 to 4 should be 0-2-4', function () {
    var expected_path = [0, 3, [0, 2, 4]];
    expect((0, homework10_1.shortest_paths)(test_graph, 0, 4)).toEqual((0, list_1.list)(expected_path));
});
test('Shortest path from node 0 to 3 should be 0-1-3 and 0-2-3', function () {
    var expected_path_1 = [0, 3, [0, 2, 3]];
    var expected_path_2 = [0, 3, [0, 1, 3]];
    expect((0, homework10_1.shortest_paths)(test_graph, 0, 3)).toEqual((0, list_1.list)(expected_path_1, expected_path_2));
});
test('Shortest path from node 0 to 1 should be 0-1', function () {
    var expected_path = [0, 2, [0, 1]];
    expect((0, homework10_1.shortest_paths)(test_graph, 0, 1)).toEqual((0, list_1.list)(expected_path));
});
test('Shortest path from node 0 to 6 should be 0-1-5-6', function () {
    var expected_path = [0, 4, [0, 1, 5, 6]];
    expect((0, homework10_1.shortest_paths)(test_graph, 0, 6)).toEqual((0, list_1.list)(expected_path));
});
// TASK 2: write 5 unit tests to test topological_sort
// at least 3 of those tests must use the function is_topological_sort
var test_graph1 = {
    size: 4,
    adj: [(0, list_1.list)(1, 2), (0, list_1.list)(3, 5), (0, list_1.list)(3, 4), (0, list_1.list)()]
};
test('Sort test_graph', function () {
    //   const expected_order: Queue<number> = [0, 4, []]
    expect((0, homework10_1.topological_sort)(test_graph)).toEqual(true);
});
