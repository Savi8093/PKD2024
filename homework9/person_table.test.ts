import { toHashtable, People, Relations } from '../homework9/person_table';
import { pair, list } from '../lib/list'

test('my test', () => {
    expect(validateTest1()).toBe(true);
});

function validateTest1() : boolean {

    var test: People = list(
        pair(19821208, "Oliver"), 
        pair(19941208, "Erik"),
        pair(19741208, "Anders"),
        pair(20041208, "Johanna"),
        pair(19451208, "Sandra")
    );

    var relations: Relations = list(
        pair(19821208, 19941208),
        pair(19821208, 19741208),
        pair(19821208, 19451208)
    );

    let response = toHashtable(test, relations);
    console.log(JSON.stringify(response));

    return true;
}