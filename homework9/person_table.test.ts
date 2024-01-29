import { toHashtable, PersonTable, People, Relations, hash } from './person_table';
import { hash_id, ph_empty, ph_insert, ph_lookup, probe_linear } from '../lib/hashtables';
import { pair, list } from '../lib/list'


let persons: People = list(
    pair(198212081234, "Oliver"), 
    pair(199412081234, "Erik"),
    pair(197412081234, "Anders"),
    pair(200412081234, "Johanna"),
    pair(194512081234, "Sandra")
);

let relations: Relations = list(
    pair(198212081234, 199412081234),
    pair(198212081234, 197412081234),
    pair(198212081234, 194512081234)
);

let person_table = toHashtable(persons, relations);


//console.log(empty_table);
//console.log(toHashtable(persons, relations));

test('empty persontable is empty', () => {
    //expect(toHashtable(list(), list())).toBe(empty_table);
});

test('Person name correct', () => {
    //expect(ph_lookup(person_table, 198212081234)?.name).toBe("Oliver");
    //expect(ph_lookup(person_table, 199412081234)?.name).toBe("Erik");
    //expect(ph_lookup(person_table, 197412081234)?.name).toBe("Anders");
    //expect(ph_lookup(person_table, 200412081234)?.name).toBe("Johanna");
    expect(ph_lookup(person_table, 194512081234)?.id).toBe("Sandra");
});

