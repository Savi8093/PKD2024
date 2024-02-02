import { List, Pair, for_each, head, is_null, tail } from '../lib/list';
import { ProbingHashtable, ph_empty, ph_delete, ph_insert,
            ph_lookup, probe_linear, hash_id } from '../lib/hashtables';

/* DO NOT MODIFY these type declarations */
export type People = List<Pair<number,string>>;
export type Relations = List<Pair<number,number>>;
export type Person = {
    id: number, // the identifier as described above
    name: string,
    parents: Array<number>,
    children: Array<number>
};
export type PersonTable = ProbingHashtable<number,Person>;
/* End of type declarations */

const prime: number = 101;
// Simple hash function
export function hash(key: number): number {
    return key % prime;
}

/**
 * Create a hash table of Person records based on given relations.
 * @precondition All ids appearing in relations are in the people list.
 * @param people peoples ids and names
 * @param relations parent-child relations
 * @return Returns a hash table with a Person record for each person from people
 *     that includes all relationships according relations.
 */
export function toHashtable(people: People, relations: Relations): PersonTable {
    const person_table: PersonTable = ph_empty<number,
                                               Person>(prime,
                                                       probe_linear(hash));

    if (!is_null(people)) {
        // Goes through all people
        for (let xs: List<Pair<number,
                               string>> = people; !is_null(xs); xs = tail(xs)) {
            let name: string = tail(head(xs));
            let ssn: number = head(head(xs));

            let parent_relations: Array<number> = [];
            let child_relations: Array<number> =[];

            // Goes through all relations
            for (let ys = relations; !is_null(ys); ys = tail(ys)) {
                let parent = head(head(ys));
                let child = tail(head(ys));
                if (parent === ssn) {
                    child_relations.push(child);
                } else {}
                if (child === ssn) {
                    parent_relations.push(parent);
                } else {}
            }

            let person = {
                id: ssn,
                name,
                parents: parent_relations,
                children: child_relations
            }
            ph_insert(person_table, person.id, person);
        }
    }
    return person_table;
}

/**
 * Computes the descendants of a person.
 * @param ht Relationships of people
 * @param id Identification number of the person to compute the descendants for
 * @returns Returns all the descendants of the person with ID id, according to
 *     the relationships in ht, or undefined if the person with ID is not
 *     found in ht.
 */
export function descendants(ht: PersonTable,
                            id: number): Array<number> | undefined {
    if (ph_lookup(ht, id) === undefined) {
        return undefined;
    } else {
        let des: Array<number> = [];
        return descendants_helper(ht, id, des);
    }
}

// Helper function to descendants
function descendants_helper(ht:PersonTable,
                            id: number,
                            des: Array<number>): Array<number> {
    let children = ph_lookup(ht, id)?.children;
    // Check if children exist
    if (children !== undefined) {
        children.forEach((child) => {
            des.push(child);
            descendants_helper(ht, child, des);
        });
    } else {}
    return des;
}