// extend as needed
import {
    type List, list, filter, for_each, append, is_null, head, pair, enum_list
} from '../lib/list';
import {
    type Queue, empty, is_empty, enqueue, dequeue, head as qhead, display_queue
} from '../lib/queue_array';
import {
    type ListGraph, lg_transpose
} from '../lib/graphs';
import path = require('path');

export type Path = Queue<number>;

// TASK 1

// Build an array based on a function computing the item at each index
function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
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
const white = 1;
const grey = 2;
const black = 3;

/**
 * Get the visit order of a breadth-first traversal of a ListGraph.
 * @param lg the list graph
 * @param initial the id of the starting node. Default 0.
 * @returns A queue with the visited nodes in visiting order.
 */
export function lg_bfs_visit_order({adj, size}: ListGraph,
                                   initial: number = 0): Queue<number> {
    const result  = empty<number>();
    const pending = empty<number>();
    const colour  = build_array(size, _ => white);

    // visit a white node
    function bfs_visit(current: number) {
        colour[current] = grey;
        enqueue(current, result);
        enqueue(current, pending);
    }

    bfs_visit(initial);

    while (!is_empty(pending)) {
        const current = qhead(pending);
        dequeue(pending);
        for_each(bfs_visit, filter(node => colour[node] === white,
                                   adj[current]));
        colour[current] = black;
    }
    return result;
}



/**
 * Find all shortest paths in a graph between two nodes.
 * @param param0 a directed acyclic graph
 * @param start start node of the shortest path(s)
 * @param end end node of the shortest path(s)
 * @returns Returns a list of all shortest paths between the start and the
 *     end node in the input graph, or an empty list if there is no path.
 */
export function shortest_paths({adj, size}: ListGraph,
                               start: number,
                               end: number): List<Path> | any {

    const result  = build_array(size, _ => -1); // Initialize distances to -1
    const pending = empty<number>();
    const colour = build_array(size, _ => white);
    const previous: Array<List<number>> = build_array(size, _ => list());
    let distance = 0;

    // visit a white node
    function bfs_visit(current: number) {
        result[current] = distance;
        colour[current] = grey;

        if (current !== end) {
            enqueue(current, pending);
        } else {}
    }

    bfs_visit(start);

    while (!is_empty(pending)) {
        const current = qhead(pending);
        dequeue(pending);
        distance = result[current] + 1;
        const children = filter(node => colour[node] === white, adj[current]);

        for_each(x => {
            const parents = previous[x];
            if (!is_null(parents)) {
                if (result[current] <= result[head(parents)]) {
                    previous[x] = append(previous[x], list(current));
                } else {}
            } else {
                previous[x] = append(previous[x], list(current));
            }

        }, adj[current]);
        for_each(bfs_visit, children);
        colour[current] = black;

    }

    // Steps through all available paths from end node back to start node
    function path_stepper(): List<Path> {
        let paths: List<Path> = list();

        // Helper function for recursive call
        function helper(current: number,
            path: List<number>) {
            const parents = previous[current];
            let updated_path = pair(current, path);
            if (current === start) {
                paths = pair(list_to_path(updated_path), paths);
            } else {}
            for_each(node => {
                pair(current, helper(node, updated_path))
            }, parents);
        }
        helper(end, list());
        return paths;
    }

    function list_to_path(path: List<number>): Path {
        const new_path: Path = empty<number>();
        for_each(node => enqueue(node, new_path),path);
        return new_path;
    }
    return path_stepper();
}

// TASK 2
/**
 * Topological sort of a graph.
 * @param param0 a directed acyclic graph
 * @returns Returns one valid topological sort of the input graph.
 */
export function topological_sort({adj, size}: ListGraph): boolean {
    const result = empty<number>();
    const in_degree = build_array(size, _ => 0);
    const queue = empty<number>();

    // Calculate in-degree for each node
    for (let u = 0; u < size; u++) {
        adj?[u].forEach(v => in_degree[v]++) : undefined;
    }
    console.log("in_deg; ", JSON.stringify(in_degree));
    // Enqueue nodes with in-degree 0
    for (let i = 0; i < size; i++) {
        if (in_degree[i] === 0) {
            enqueue(i, queue);
        }
    }
    console.log("queue; ", JSON.stringify(queue));
    while (!is_empty(queue)) {
        const u = qhead(queue);
        dequeue(queue);
        enqueue(u, result);
        adj?[u].forEach(v => {
            in_degree[v]--;
            if (in_degree[v] === 0) {
                enqueue(v, queue);
            }
        }) : undefined;
    }
    console.log("result; ",JSON.stringify(result));
    return true;
}


/**
 * Check whether a topological sort of a graph is valid.
 * @param param0 a directed acyclic graph
 * @param tsort topological ordering to check
 * @returns Returns true if tsort is a valid topological ordering of the
 *     nodes in the input graph, false otherwise.
 */
export function is_topological_sort({adj, size}: ListGraph,
                                    tsort: Queue<number>): boolean {
    return false;
}


export function lg_bfs_topological_sort(lg: ListGraph,
    restart_order: List<number> = null): Queue<number> {
    const {adj, size} = lg_transpose(lg); //MODIFIED

    const result = empty<number>();
    const colour  = build_array(size, _ => white);
    if (restart_order === null) {  // MODIFIED
        restart_order = enum_list(0, size - 1);
    } else {}

    function lg_bfs_enqueue_finishing_order(initial: number): void {
        const pending = empty<number>();

        function bfs_visit(current: number) {
            colour[current] = grey;
            enqueue(current, pending);
        }

        if (colour[initial] === white) { // MODIFIED
            bfs_visit(initial);
        } else {}

        while (!is_empty(pending)) {
            const current = qhead(pending);
            dequeue(pending);
            for_each(bfs_visit, filter(node => colour[node] === white, adj[current]));
            colour[current] = black;
            enqueue(current, result); // MODIFIED
        }
    }

    for_each(lg_bfs_enqueue_finishing_order, restart_order); //MODIFIED

    return result;
}

