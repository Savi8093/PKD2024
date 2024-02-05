// extend as needed
import {
    type List, list, filter, for_each, append, is_null, head, tail
} from '../lib/list';
import {
    type Queue, empty, is_empty, enqueue, dequeue, head as qhead, display_queue
} from '../lib/queue_array';
import {
    type ListGraph
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
    const unvisited = -1;

    const result  = build_array(size, _ => -1); // Initialize distances to -1
    const pending = empty<number>();
    const colour = build_array(size, _ => white);
    const previous: Array<List<number>> = build_array(size, _ => list());
    let distance = 0;

    // visit a white node
    function bfs_visit(current: number) {
        result[current] = distance;
        colour[current] = grey;

        //console.log(current, distance);
        if (current === end) {
            //append(paths, list(current_path));
        } else {
            enqueue(current, pending);
        }
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
                if (result[x] <= result[head(parents)]) {
                    previous[x] = append(previous[x], list(current))
                } else {}
            } else {
                previous[x] = append(previous[x], list(current));
            }
            

        }, adj[current]);
        for_each(bfs_visit, children);
        colour[current] = black;

    }
    //const current_path: Path = empty<number>();
    // const current_path: Array<number> = [];
    // let current_node = end;
    // let i = end;
    // while (current_node !== start) {
    //     if (is_null(previous[i]) && )
    // }

    function path_stepper(start: number,
                          current: number,
                          path: List<number>): List<number> {
        const parents = previous[current];
        if (!is_null(parents) && parents.length < 1) {
            //path_stepper(start, head(parents), path);
        }
        return path;
    }

    // current_path.push(start);
    // current_path.reverse();
    //enqueue(start, current_path)
    // const reverse_path = empty<number>();
    // for (let i = 0; i < current_path.length ; i++) {
    //     enqueue(qhead(current_path), reverse_path);
    //     dequeue(current_path);
    // }

    //console.log("path", current_path);

    // console.log("result", result);
    // console.log("shortest", result[end]);
    console.log("previous", previous);

    return path_stepper(start, end, list());
}

const test_graph: ListGraph = {
    size: 7,
    adj: [list(1, 2), list(3, 5), list(3, 4), list(4),
          list(5), list(6), list()]
}

console.log(shortest_paths(test_graph, 0, 3));


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
