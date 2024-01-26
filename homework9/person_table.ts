import { ProbingHashtable } from "../lib/hashtables";

type People = List<Pair<number,string>>;
type Relations = List<Pair<number, number>>;
type Person = {
    id: number, //the identifier as described above
    name: string,
    parents: Array<number>,
    children: Array<number>
};
type PersonTable = ProbingHashtable<number, Person>;

function toHashtable(people: People, relations: Relations): PersonTable{
    
}


// tests
