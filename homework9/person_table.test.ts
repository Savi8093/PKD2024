import { toHashtable, PersonTable, People, Relations, hash, descendants } from './person_table';
import { hash_id, ph_empty, ph_insert, ph_lookup, probe_linear } from '../lib/hashtables';
import { pair, list } from '../lib/list'


let persons: People = list(
    pair(198212081234, "Oliver"),
    pair(199912081234, "Erik"),
    pair(195412081234, "Anders"),
    pair(200412081234, "Johanna"),
    pair(195512081234, "Sandra"),
    pair(-290000001234, "Gilgamesh"),
    pair(130000001234, "Hjördis")
);

let relations: Relations = list(
    pair(198212081234, 199912081234),
    pair(198212081234, 200412081234),
    pair(195412081234, 198212081234),
    pair(195512081234, 198212081234)
);

let person_table = toHashtable(persons, relations);

// Test cases for task 1
test('Returns undefined if person doesnt exist', () => {
    expect(ph_lookup(person_table, 200003031234)).toBe(undefined);
});

test('Negative birthdates work', () => {
    expect(ph_lookup(person_table, -290000001234)?.name).toBe("Gilgamesh");
});

test('Zeroes for unknown dates work', () => {
    expect(ph_lookup(person_table, 130000001234)?.name).toBe("Hjördis");
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


// Test cases for task 2
test('Returns undefined if person doesnt exist', () => {
    expect(descendants(person_table, 200300031234)).toBe(undefined);
});

test('Returns empty array if no descendants are found', () => {
    expect(descendants(person_table, 200412081234)).toEqual([]);
});

test('Returns all direct descendants', () => {
    expect(descendants(person_table, 198212081234)).toEqual([199912081234,
                                                             200412081234]);
});

test('Returns all descendants and their descendants', () => {
    expect(descendants(person_table, 195512081234)).toEqual([198212081234,
                                                             199912081234,
                                                             200412081234]);
});

test('', () => {
    // expect(descendants(person_table, 200300031234)).toBe(undefined);
});

