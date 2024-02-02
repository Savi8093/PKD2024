"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mg_dfs_visit_order = exports.lg_dfs_visit_order = exports.lg_bfs_visit_order = void 0;
var queue_array_1 = require("../lib/queue_array");
var list_1 = require("../lib/list");
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
 * Get the visit order of a depth-first traversal of a ListGraph.
 * @param lg the list graph
 * @param restart_order the order of nodes to restart the traversal in.
 *      Default: in numeric order 0, 1, 2, ...
 * @returns A queue with the visited nodes in visiting order.
 */
function lg_dfs_visit_order(_a, restart_order) {
    var adj = _a.adj, size = _a.size;
    if (restart_order === void 0) { restart_order = null; }
    var result = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    if (restart_order === null) {
        restart_order = (0, list_1.enum_list)(0, size - 1);
    }
    else { }
    // visit a node.  Each node is processed at most once.
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            (0, queue_array_1.enqueue)(current, result);
            (0, list_1.for_each)(dfs_visit, adj[current]);
            colour[current] = black;
        }
        else { }
    }
    (0, list_1.for_each)(dfs_visit, restart_order);
    return result;
}
exports.lg_dfs_visit_order = lg_dfs_visit_order;
/**
 * Get the visit order of a depth-first traversal of a MatrixGraph.
 * @param mg the graph
 * @param restart_order the order of nodes to restart the traversal in.
 *      Default: in numeric order 0, 1, 2, ...
 * @returns A queue with the visited nodes in visiting order.
 */
function mg_dfs_visit_order(_a, restart_order) {
    var adj = _a.adj, size = _a.size;
    if (restart_order === void 0) { restart_order = null; }
    var result = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    if (restart_order === null) {
        restart_order = (0, list_1.enum_list)(0, size - 1);
    }
    else { }
    // visit a node. Each node is processed at most once.
    function dfs_visit(current) {
        if (colour[current] === white) {
            colour[current] = grey;
            (0, queue_array_1.enqueue)(current, result);
            for (var sink = 0; sink < size; sink = sink + 1) {
                if (adj[current][sink]) {
                    dfs_visit(sink);
                }
                else { }
            }
            colour[current] = black;
        }
        else { }
    }
    (0, list_1.for_each)(dfs_visit, restart_order);
    return result;
}
exports.mg_dfs_visit_order = mg_dfs_visit_order;
