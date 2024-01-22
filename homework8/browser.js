"use strict";
// TODO: your imports here
// (only list, stack, queue_immutable, or queue_array from ../lib are allowed)
Object.defineProperty(exports, "__esModule", { value: true });
exports.go_forward = exports.go_back = exports.visit_page = exports.current_page = exports.new_browser_history = exports.empty_page = void 0;
var stack_1 = require("../lib/stack");
exports.empty_page = "404 does not exist";
/**
 * Creates a fresh browser history.
 * @returns Creates an empty browser history.
 */
function new_browser_history() {
    return [(0, stack_1.empty)(), exports.empty_page, (0, stack_1.empty)()];
}
exports.new_browser_history = new_browser_history;
/**
 * The currently open page in a browser history.
 * @param history A browser history
 * @returns The URL of the currently open website in history.
 */
function current_page(history) {
    return history[1];
}
exports.current_page = current_page;
/**
 * Update a browser history when visiting the new page.
 * This clears the forward history of pages visited.
 * @precondition page is not empty
 * @param history browser history so far
 * @param page the URL of the next page to visit
 * @return An updated browser history with 'page' as the current page and
 *     no forward pages stored.
 */
function visit_page(history, page) {
    return [(0, stack_1.push)(history[1], history[0]), page, (0, stack_1.empty)()];
}
exports.visit_page = visit_page;
/**
 * Update a browser history when navigating one page back.
 * @param history browser history so far
 * @returns An updated browser history with the current page being the one
 *    visited immediately before the current page in 'history', or the input
 *    'history' unchanged if there is no page to go back to.
 */
function go_back(history) {
    if ((0, stack_1.is_empty)(history[0])) {
        return history;
    }
    var current = current_page(history);
    var new_page = (0, stack_1.top)(history[0]);
    return [(0, stack_1.pop)(history[0]), new_page, (0, stack_1.push)(current, history[2])];
}
exports.go_back = go_back;
/**
 * Update a browser history when navigating one page forward.
 * @param history browser history so far
 * @return An updated browser history with the current page the one that was
 *     last navigated back from, or the input 'history' unchanged if there is no
 *     page to go forward to.
 */
function go_forward(history) {
    if ((0, stack_1.is_empty)(history[2])) {
        return history;
    }
    var current = current_page(history);
    var new_page = (0, stack_1.top)(history[2]);
    return [(0, stack_1.push)(current, history[0]), new_page, (0, stack_1.pop)(history[2])];
}
exports.go_forward = go_forward;
