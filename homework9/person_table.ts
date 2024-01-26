import { List, Pair } from '../lib/list';
import { ProbingHashtable, ph_empty, ph_delete, ph_insert, ph_lookup, probe_linear } from '../lib/hashtables';

type People = List<Pair<number,string>>;
type Relations = List<Pair<number,number>>;
type Person = {
    id: number,  // the identifier as described above
    name: string,
    parents: Array<number>,
    children: Array<number>
};
type PersonTable = ProbingHashtable<number, Person>;

function toHashtable(people: People, relations: Relations): PersonTable {
    const prime: number = 101;
    function hash(key: number): number {
        return key % prime;
    }
    const person_table: PersonTable = ph_empty<number, Person>(prime, probe_linear(hash));
    
    return person_table;    
}
