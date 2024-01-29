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
// Simple hash function
function hash(key) {
    return key % prime;
}
exports.hash = hash;
/**
 * Create a hash table of Person records based on given relations.
 * @precondition All ids appearing in relations are in the people list.
 * @param people peoples ids and names
 * @param relations parent-child relations
 * @return Returns a hash table with a Person record for each person from people
 *     that includes all relationships according relations.
 */
function toHashtable(people, relations) {
    var person_table = (0, hashtables_1.ph_empty)(prime, (0, hashtables_1.probe_linear)(hash));
    if (!(0, list_1.is_null)(people)) {
        for (var xs = people; !(0, list_1.is_null)(xs); xs = (0, list_1.tail)(xs)) {
            var name_1 = (0, list_1.tail)((0, list_1.head)(xs));
            var ssn = (0, list_1.head)((0, list_1.head)(xs));
            var parent_relations = [];
            var parent_count = 0;
            var child_relations = [];
            var child_count = 0;
            for (var ys = relations; !(0, list_1.is_null)(ys); ys = (0, list_1.tail)(ys)) {
                var parent_1 = (0, list_1.head)((0, list_1.head)(ys));
                var child = (0, list_1.tail)((0, list_1.head)(ys));
                if (parent_1 === ssn) {
                    child_relations[child_count] = child;
                    child_count++;
                }
                else { }
                if (child === ssn) {
                    parent_relations[parent_count] = parent_1;
                    parent_count++;
                }
                else { }
            }
            var person = {
                id: ssn,
                name: name_1,
                parents: parent_relations,
                children: child_relations
            };
            (0, hashtables_1.ph_insert)(person_table, person.id, person);
        }
    }
    return person_table;
}
exports.toHashtable = toHashtable;
