// extend as needed
import {
    type List, list, filter, for_each, append
} from '../lib/list';
import {
    type Queue, empty, is_empty, enqueue, dequeue, head as qhead
} from '../lib/queue_array';
import {
    type ListGraph
} from '../lib/graphs';

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
export function lg_bfs_visit_order({adj, size}: ListGraph, initial: number = 0): Queue<number> {
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
        for_each(bfs_visit, filter(node => colour[node] === white, adj[current]));
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
                               end: number): List<Path> | number {
    const result  = build_array(size, _ => 0); // Initialize distances to -1
    const pending = empty<number>();
    const colour  = build_array(size, _ => white);
    const paths: List<Path> = list();
    let distance = 0;

    // visit a white node
    function bfs_visit(current: number) {
        colour[current] = grey;
        result[current] = distance;
        enqueue(current, pending);
    }

    bfs_visit(start);

    while (!is_empty(pending)) {
        const current = qhead(pending);
        dequeue(pending);
        distance = result[current] + 1;
        for_each(bfs_visit, filter(node => colour[node] === white, adj[current]));
        colour[current] = black;
    }

    return result[end];
}



// TASK 2
/**
 * Topological sort of a graph.
 * @param param0 a directed acyclic graph
 * @returns Returns one valid topological sort of the input graph.
 */
export function topological_sort({adj, size}: ListGraph): Queue<number> {
    // your code here
    return empty();
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
    // your code here
    return false;
}
