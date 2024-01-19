import {
    BrowserHistory, current_page, visit_page, go_back, go_forward,
    new_browser_history
} from './browser';

// Example Usage:
const browser_history = new_browser_history();

const history1 = visit_page(visit_page(visit_page(browser_history, "Home"),
                                       "About"),
                            "Contact");

console.log("should print 'Contact': " + current_page(history1));

const history2 = go_back(history1);
console.log("should print 'About': " + current_page(history2));

const history3 = go_forward(history2);
console.log("should print 'Contact': " + current_page(history3));

const history4 = visit_page(history3, "News");
console.log("should print 'News': " + current_page(history4));

const history5 = go_forward(history4);
console.log("should print 'News': " + current_page(history5));

