"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_topological_sort = exports.topological_sort = exports.shortest_paths = exports.lg_bfs_visit_order = void 0;
// extend as needed
var list_1 = require("../lib/list");
var queue_array_1 = require("../lib/queue_array");
// TASK 1
// Build an array based on a function computing the item at each index
function build_array(size, content) {
    var result = Array(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}
/**
 * Node colours for traversal algorithms
 * @constant white an unvisited node
 * @constant grey a visited but not finished node
 * @constant black a finished node
 */
var white = 1;
var grey = 2;
var black = 3;
/**
 * Get the visit order of a breadth-first traversal of a ListGraph.
 * @param lg the list graph
 * @param initial the id of the starting node. Default 0.
 * @returns A queue with the visited nodes in visiting order.
 */
function lg_bfs_visit_order(_a, initial) {
    var adj = _a.adj, size = _a.size;
    if (initial === void 0) { initial = 0; }
    var result = (0, queue_array_1.empty)();
    var pending = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    // visit a white node
    function bfs_visit(current) {
        colour[current] = grey;
        (0, queue_array_1.enqueue)(current, result);
        (0, queue_array_1.enqueue)(current, pending);
    }
    bfs_visit(initial);
    while (!(0, queue_array_1.is_empty)(pending)) {
        var current = (0, queue_array_1.head)(pending);
        (0, queue_array_1.dequeue)(pending);
        (0, list_1.for_each)(bfs_visit, (0, list_1.filter)(function (node) { return colour[node] === white; }, adj[current]));
        colour[current] = black;
    }
    return result;
}
exports.lg_bfs_visit_order = lg_bfs_visit_order;
/**
 * Find all shortest paths in a graph between two nodes.
 * @param param0 a directed acyclic graph
 * @param start start node of the shortest path(s)
 * @param end end node of the shortest path(s)
 * @returns Returns a list of all shortest paths between the start and the
 *     end node in the input graph, or an empty list if there is no path.
 */
function shortest_paths(_a, start, end) {
    var adj = _a.adj, size = _a.size;
    var result = build_array(size, function (_) { return -1; }); // Initialize distances to -1
    var pending = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    var paths = (0, list_1.list)();
    var distance = 0;
    // visit a white node
    function bfs_visit(current) {
        colour[current] = grey;
        result[current] = distance;
        //console.log(current, distance);
        if (current === end) {
            (0, list_1.append)(paths, (0, list_1.list)(current_path));
        }
        else {
            (0, queue_array_1.enqueue)(current, pending);
        }
    }
    bfs_visit(start);
    var current_path = (0, queue_array_1.empty)();
    while (!(0, queue_array_1.is_empty)(pending)) {
        var current = (0, queue_array_1.head)(pending);
        (0, queue_array_1.enqueue)(current, current_path);
        (0, queue_array_1.dequeue)(pending);
        distance = result[current] + 1;
        (0, list_1.for_each)(bfs_visit, (0, list_1.filter)(function (node) { return colour[node] === white; }, adj[current]));
        colour[current] = black;
    }
    console.log(result);
    return current_path;
}
exports.shortest_paths = shortest_paths;
var test_graph = {
    size: 7,
    adj: [(0, list_1.list)(1, 2), (0, list_1.list)(3, 5), (0, list_1.list)(3, 4), (0, list_1.list)(4),
        (0, list_1.list)(5), (0, list_1.list)(6), (0, list_1.list)()]
};
console.log(shortest_paths(test_graph, 1, 5));
// TASK 2
/**
 * Topological sort of a graph.
 * @param param0 a directed acyclic graph
 * @returns Returns one valid topological sort of the input graph.
 */
function topological_sort(_a) {
    var adj = _a.adj, size = _a.size;
    // your code here
    return (0, queue_array_1.empty)();
}
exports.topological_sort = topological_sort;
/**
 * Check whether a topological sort of a graph is valid.
 * @param param0 a directed acyclic graph
 * @param tsort topological ordering to check
 * @returns Returns true if tsort is a valid topological ordering of the
 *     nodes in the input graph, false otherwise.
 */
function is_topological_sort(_a, tsort) {
    var adj = _a.adj, size = _a.size;
    // your code here
    return false;
}
exports.is_topological_sort = is_topological_sort;
