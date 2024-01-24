// TODO: your imports here
// (only list, stack, queue_immutable, or queue_array from ../lib are allowed)

import {
    Stack, empty, is_empty, display_stack, push, pop, top
} from '../lib/stack';

/**
 * Stores the history of visited webpages in a browser for forwards and
 * backwards navigation.
 * First stack is backward history, middle string is current page, last stack is forward history.
 */
export type BrowserHistory = [Stack<string>, string, Stack<string>];

// Message for empty history.
export const empty_page: string = "404 does not exist";

/**
 * Creates a fresh browser history.
 * @returns Creates an empty browser history.
 */
export function new_browser_history(): BrowserHistory {
    return [empty<string>(), empty_page, empty<string>()];

}

/**
 * The currently open page in a browser history.
 * @param history A browser history
 * @returns The URL of the currently open website in history.
 */
export function current_page(history: BrowserHistory): string {
    return history[1];
}


/**
 * Update a browser history when visiting the new page.
 * This clears the forward history of pages visited.
 * @precondition page is not empty
 * @param history browser history so far
 * @param page the URL of the next page to visit
 * @return An updated browser history with 'page' as the current page and
 *     no forward pages stored.
 */
export function visit_page(history: BrowserHistory, page: string): BrowserHistory {
    return [push(history[1], history[0]), page, empty<string>()];
}

/**
 * Update a browser history when navigating one page back.
 * @param history browser history so far
 * @returns An updated browser history with the current page being the one
 *    visited immediately before the current page in 'history', or the input
 *    'history' unchanged if there is no page to go back to.
 */
export function go_back(history: BrowserHistory): BrowserHistory {
    if (is_empty(history[0])) {
        return history;
    }
    const current: string = current_page(history);
    const new_page: string = top(history[0]);
    return [pop(history[0]), new_page, push(current, history[2])];
}

/**
 * Update a browser history when navigating one page forward.
 * @param history browser history so far
 * @return An updated browser history with the current page the one that was
 *     last navigated back from, or the input 'history' unchanged if there is no
 *     page to go forward to.
 */
export function go_forward(history: BrowserHistory): BrowserHistory {
    if (is_empty(history[2])) {
        return history;
    }
    const current: string = current_page(history);
    const new_page: string = top(history[2]);
    return [push(current, history[0]), new_page, pop(history[2])];
}