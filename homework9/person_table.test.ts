import { toHashtable, PersonTable, People, Relations, hash } from './person_table';
import { hash_id, ph_empty, ph_insert, ph_lookup, probe_linear } from '../lib/hashtables';
import { pair, list } from '../lib/list'


let persons: People = list(
    pair(198212081234, "Oliver"), 
    pair(199912081234, "Erik"),
    pair(195412081234, "Anders"),
    pair(200412081234, "Johanna"),
    pair(195512081234, "Sandra")
);

let relations: Relations = list(
    pair(198212081234, 199912081234),
    pair(198212081234, 200412081234),
    pair(195412081234, 198212081234),
    pair(195512081234, 198212081234)
);

let person_table = toHashtable(persons, relations);

test('Empty table is empty', () => {
    //expect(toHashtable(list(), list())).toEqual(ph_empty(101, hash));
});

test('Persons name is correct', () => {
    expect(ph_lookup(person_table, 198212081234)?.name).toBe("Oliver");
    expect(ph_lookup(person_table, 195412081234)?.name).toBe("Anders");
    expect(ph_lookup(person_table, 195512081234)?.name).toBe("Sandra");
});

test('Parents are correct', () => {
    expect(ph_lookup(person_table,
        198212081234)?.parents).toEqual([195412081234,
                                         195512081234]);
    expect(ph_lookup(person_table,
                     199912081234)?.parents).toEqual([198212081234]);
});

test('Children are correct', () => {
    expect(ph_lookup(person_table,
        198212081234)?.children).toEqual([199912081234,
                                          200412081234]);
    expect(ph_lookup(person_table,
                     195412081234)?.children).toEqual([198212081234]);
});


