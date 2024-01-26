"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hashtables_1 = require("../lib/hashtables");
function toHashtable(people, relations) {
    var prime = 101;
    function hash(key) {
        return key % prime;
    }
    var person_table = (0, hashtables_1.ph_empty)(prime, (0, hashtables_1.probe_linear)(hash));
    return person_table;
}
