// extend as needed
import {
    type List, list
} from '../lib/list';
import {
    type Path, shortest_paths, topological_sort, is_topological_sort
} from './homework10';
import {
    type Queue, empty, is_empty, enqueue, dequeue, head as qhead
} from '../lib/queue_array';
import {
    type ListGraph
} from '../lib/graphs';

const test_graph: ListGraph = {
    size: 7,
    adj: [list(1, 2), list(3, 5), list(3, 4), list(4),
          list(5), list(6), list()]
}

// TASK 1: write 5 unit tests to test shortest_paths
test('Returns no path', () => {
    expect(shortest_paths(test_graph, 3, 1)).toEqual(list());
});

test('Shortest path from node 1 to 4 should be 1-3-4', () => {
    const expected_path: Path = [0, 3, [1, 3, 4]];
    expect(shortest_paths(test_graph, 1, 4)).toEqual(list(expected_path));
});

test('Shortest path from node 0 to 4 should be 0-2-4', () => {
    const expected_path: Path = [0, 3, [0, 2, 4]];
    expect(shortest_paths(test_graph, 0, 4)).toEqual(list(expected_path));
});

test('Shortest path from node 0 to 3 should be 0-1-3 and 0-2-3', () => {
    const expected_path_1: Path = [0, 3, [0, 2, 3]];
    const expected_path_2: Path = [0, 3, [0, 1, 3]];
    expect(shortest_paths(test_graph, 0, 3)).toEqual(list(expected_path_1,
                                                          expected_path_2));
});

test('Shortest path from node 0 to 1 should be 0-1', () => {
    const expected_path: Path = [0, 2, [0, 1]];
    expect(shortest_paths(test_graph, 0, 1)).toEqual(list(expected_path));
});

test('Shortest path from node 0 to 6 should be 0-1-5-6', () => {
    const expected_path: Path = [0, 4, [0, 1, 5, 6]];
    expect(shortest_paths(test_graph, 0, 6)).toEqual(list(expected_path));
});



// TASK 2: write 5 unit tests to test topological_sort
// at least 3 of those tests must use the function is_topological_sort