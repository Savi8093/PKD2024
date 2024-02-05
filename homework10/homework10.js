"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lg_bfs_topological_sort = exports.is_topological_sort = exports.topological_sort = exports.shortest_paths = exports.lg_bfs_visit_order = void 0;
// extend as needed
var list_1 = require("../lib/list");
var queue_array_1 = require("../lib/queue_array");
var graphs_1 = require("../lib/graphs");
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
    var previous = build_array(size, function (_) { return (0, list_1.list)(); });
    var distance = 0;
    // visit a white node
    function bfs_visit(current) {
        result[current] = distance;
        colour[current] = grey;
        if (current !== end) {
            (0, queue_array_1.enqueue)(current, pending);
        }
        else { }
    }
    bfs_visit(start);
    var _loop_1 = function () {
        var current = (0, queue_array_1.head)(pending);
        (0, queue_array_1.dequeue)(pending);
        distance = result[current] + 1;
        var children = (0, list_1.filter)(function (node) { return colour[node] === white; }, adj[current]);
        (0, list_1.for_each)(function (x) {
            var parents = previous[x];
            if (!(0, list_1.is_null)(parents)) {
                if (result[current] <= result[(0, list_1.head)(parents)]) {
                    previous[x] = (0, list_1.append)(previous[x], (0, list_1.list)(current));
                }
                else { }
            }
            else {
                previous[x] = (0, list_1.append)(previous[x], (0, list_1.list)(current));
            }
        }, adj[current]);
        (0, list_1.for_each)(bfs_visit, children);
        colour[current] = black;
    };
    while (!(0, queue_array_1.is_empty)(pending)) {
        _loop_1();
    }
    // Steps through all available paths from end node back to start node
    function path_stepper() {
        var paths = (0, list_1.list)();
        // Helper function for recursive call
        function helper(current, path) {
            var parents = previous[current];
            var updated_path = (0, list_1.pair)(current, path);
            if (current === start) {
                paths = (0, list_1.pair)(list_to_path(updated_path), paths);
            }
            else { }
            (0, list_1.for_each)(function (node) {
                (0, list_1.pair)(current, helper(node, updated_path));
            }, parents);
        }
        helper(end, (0, list_1.list)());
        return paths;
    }
    function list_to_path(path) {
        var new_path = (0, queue_array_1.empty)();
        (0, list_1.for_each)(function (node) { return (0, queue_array_1.enqueue)(node, new_path); }, path);
        return new_path;
    }
    return path_stepper();
}
exports.shortest_paths = shortest_paths;
// TASK 2
/**
 * Topological sort of a graph.
 * @param param0 a directed acyclic graph
 * @returns Returns one valid topological sort of the input graph.
 */
function topological_sort(_a) {
    var adj = _a.adj, size = _a.size;
    var result = (0, queue_array_1.empty)();
    var in_degree = build_array(size, function (_) { return 0; });
    var queue = (0, queue_array_1.empty)();
    // Calculate in-degree for each node
    for (var u = 0; u < size; u++) {
        adj ? [u].forEach(function (v) { return in_degree[v]++; }) : undefined;
    }
    console.log("in_deg; ", JSON.stringify(in_degree));
    // Enqueue nodes with in-degree 0
    for (var i = 0; i < size; i++) {
        if (in_degree[i] === 0) {
            (0, queue_array_1.enqueue)(i, queue);
        }
    }
    console.log("queue; ", JSON.stringify(queue));
    while (!(0, queue_array_1.is_empty)(queue)) {
        var u = (0, queue_array_1.head)(queue);
        (0, queue_array_1.dequeue)(queue);
        (0, queue_array_1.enqueue)(u, result);
        adj ? [u].forEach(function (v) {
            in_degree[v]--;
            if (in_degree[v] === 0) {
                (0, queue_array_1.enqueue)(v, queue);
            }
        }) : undefined;
    }
    console.log("result; ", JSON.stringify(result));
    return true;
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
    return false;
}
exports.is_topological_sort = is_topological_sort;
function lg_bfs_topological_sort(lg, restart_order) {
    if (restart_order === void 0) { restart_order = null; }
    var _a = (0, graphs_1.lg_transpose)(lg), adj = _a.adj, size = _a.size; //MODIFIED
    var result = (0, queue_array_1.empty)();
    var colour = build_array(size, function (_) { return white; });
    if (restart_order === null) { // MODIFIED
        restart_order = (0, list_1.enum_list)(0, size - 1);
    }
    else { }
    function lg_bfs_enqueue_finishing_order(initial) {
        var pending = (0, queue_array_1.empty)();
        function bfs_visit(current) {
            colour[current] = grey;
            (0, queue_array_1.enqueue)(current, pending);
        }
        if (colour[initial] === white) { // MODIFIED
            bfs_visit(initial);
        }
        else { }
        while (!(0, queue_array_1.is_empty)(pending)) {
            var current = (0, queue_array_1.head)(pending);
            (0, queue_array_1.dequeue)(pending);
            (0, list_1.for_each)(bfs_visit, (0, list_1.filter)(function (node) { return colour[node] === white; }, adj[current]));
            colour[current] = black;
            (0, queue_array_1.enqueue)(current, result); // MODIFIED
        }
    }
    (0, list_1.for_each)(lg_bfs_enqueue_finishing_order, restart_order); //MODIFIED
    return result;
}
exports.lg_bfs_topological_sort = lg_bfs_topological_sort;
