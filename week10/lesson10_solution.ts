import { type Queue, empty, is_empty, enqueue, dequeue, head as qhead } from '../lib/queue_array';
import { type Pair, pair, for_each, filter, enum_list, head, tail, list, List, is_null } from '../lib/list';
import { type EdgeList, type ListGraph, type MatrixGraph } from '../lib/graphs';


const white = 0;
const grey  = 1;
const black = 2;

function build_array<T>(size: number, content: (i: number) => T): Array<T> {
    const result = Array<T>(size);
    for (var i = 0; i < size; i = i + 1) {
        result[i] = content(i);
    }
    return result;
}

//PROBLEM 1
const I = true;
const O = false;
const graph1mg: MatrixGraph = {size: 8, adj :
    [[O, I, O, I, O, O, O, O],
     [O, O, I, O, O, I, O, O],
     [O, O, O, O, O, O, O, O],
     [O, O, I, I, I, O, O, O],
     [O, O, O, O, O, O, I, O],
     [O, O, O, O, I, O, O, I],
     [O, O, O, O, O, O, O, O],
     [O, O, O, O, O, O, I, O]] };
const graph1lg: ListGraph = {
    size: 8,
    adj: [list(1, 3), list(2, 5), list(), list(2, 3, 4),
          list(6), list(4, 7), list(), list(6)]
};

const graph1el: EdgeList = list(pair(0, 1), pair(0, 3), pair(1, 2), pair(1, 5), 
                                pair(3, 2), pair(3, 3), pair(3, 4), pair(4, 6), 
                                pair(5, 4), pair(5, 7), pair(9, 6));


//PROBLEM 2
export function lg_bfs_distance({adj, size}: ListGraph, 
                                initial: number = 0): Array<number> {     
    const result  = Array<number>(size); // MODIFIED
    const pending = empty<number>();
    const colour  = build_array(size, _ => white);

    function bfs_visit(distance: number): (current: number) => void {
        return current => {
            colour[current] = grey;
            result[current] = distance;  // MODIFIED
            enqueue(current, pending);
        }
    }

    bfs_visit(0)(initial);

    while (!is_empty(pending)) {
        const current = qhead(pending);
        dequeue(pending);
        for_each(bfs_visit(result[current] + 1), // MODIFIED
                 filter(node => colour[node] === white, 
                        adj[current]));
        colour[current] = black;
    }

    return result;
}


// PROBLEM 3
export function mg_dfs_reverse_finish_order({adj, size}: MatrixGraph, 
        restart_order: List<number> = null): List<number> {        
    var result: List<number> = null;  // MODIFIED
    const colour = build_array(size, _ => white);
    if (restart_order === null) {
        restart_order = enum_list(0, size - 1);
    } else {}

    function dfs_visit(current: number): void {
        if (colour[current] === white) {
            colour[current] = grey;
            for (var sink = 0; sink < size; sink = sink + 1) {
                if(adj[current][sink]) {
                    dfs_visit(sink);
                } else {}
            }
            colour[current] = black;
            result = pair(current, result);  // MODIFIED
        } else {}
    }

    for_each(dfs_visit, restart_order);

    return result;
}
