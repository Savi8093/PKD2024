"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("./browser");
// Example Usage:
var browser_history = (0, browser_1.new_browser_history)();
var history1 = (0, browser_1.visit_page)((0, browser_1.visit_page)((0, browser_1.visit_page)(browser_history, "Home"), "About"), "Contact");
console.log("should print 'Contact': " + (0, browser_1.current_page)(history1));
var history2 = (0, browser_1.go_back)(history1);
console.log("should print 'About': " + (0, browser_1.current_page)(history2));
var history3 = (0, browser_1.go_forward)(history2);
console.log("should print 'Contact': " + (0, browser_1.current_page)(history3));
var history4 = (0, browser_1.visit_page)(history3, "News");
console.log("should print 'News': " + (0, browser_1.current_page)(history4));
var history5 = (0, browser_1.go_forward)(history4);
console.log("should print 'News': " + (0, browser_1.current_page)(history5));
