"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHashtable = exports.hash = void 0;
var list_1 = require("../lib/list");
var hashtables_1 = require("../lib/hashtables");
// 19941208 | 20041245
// 19981568 | 19721568
// 19941208 | 19651568
// 19861568 | 19911568
// 19941208 | 20041245
// 19941208 | 19651568
var prime = 101;
function hash(key) {
    return key % prime;
}
exports.hash = hash;
function toHashtable(people, relations) {
    var person_table = (0, hashtables_1.ph_empty)(210000000000, (0, hashtables_1.probe_linear)(hashtables_1.hash_id));
    // Går igenom alla personer som ska läggas till
    people === null || people === void 0 ? void 0 : people.forEach(function (item) {
        var ssn = (0, list_1.head)(item);
        var name = (0, list_1.tail)(item);
        // Filtrerar ut alla parents för personen som ska läggas till
        var parentRelations = relations === null || relations === void 0 ? void 0 : relations.map(function (rel) {
            if ((0, list_1.head)(rel) === ssn && ssn < (0, list_1.tail)(rel)) {
                return (0, list_1.tail)(rel);
            }
            else { }
        });
        // Filtrerar ut alla children för personen som ska läggas till
        var childrenRelations = relations === null || relations === void 0 ? void 0 : relations.map(function (rel) {
            if ((0, list_1.head)(rel) === ssn && ssn > (0, list_1.tail)(rel)) {
                return (0, list_1.tail)(rel);
            }
            else { }
        });
        var person = {
            id: ssn,
            name: name,
            parents: parentRelations,
            children: childrenRelations
        };
        (0, hashtables_1.ph_insert)(person_table, person.id, person);
    });
    return person_table;
}
exports.toHashtable = toHashtable;
