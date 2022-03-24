import {TestHelper} from "../../testHelper";
import {CreateActorInput} from "../../../src/schema/actorSchema";
import { Actor } from '../../../src/database/entity/Actor';


beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});

describe('Actor Service Tests', () => {

    test('should create an actor', async () => {
        const createActorInput = new CreateActorInput();
        createActorInput.name = 'Daniel';
        createActorInput.lastName = 'Posada';
        createActorInput.birthdayDate = new Date();

        const actor = await Actor.create(createActorInput).save();
        expect(actor.name).toBe('Daniel');
        expect(actor.lastName).toBe('Posada');
    });

})
