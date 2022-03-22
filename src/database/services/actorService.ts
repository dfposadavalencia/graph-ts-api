import { Service } from 'typedi';
import { Actor } from '../entity/Actor';
import { CreateActorInput, UpdateActorInput } from '../../schema/actor';

@Service()
export class ActorService {

    getAll = async (): Promise<Actor[]> => {
        return await Actor.find({relations: ["movies"]});
    };

    getOne = async (id: number): Promise<Actor | undefined> => {
        const actor = await Actor.findOne(id, {relations: ["movies"]});

        if (!actor) {
            throw new Error(`The actor with id: ${id} does not exist!`);
        }
        return actor;
    };

    create = async (createActorInput: CreateActorInput): Promise<Actor> => {
        return await Actor.create(createActorInput).save();
    };

    update = async (
        id: number,
        updateActorInput: UpdateActorInput,
    ): Promise<Actor> => {
        const actorFound = await Actor.findOne({ where: { id } });

        if (!actorFound) {
            throw new Error(`The actor with id: ${id} does not exist!`);
        }

        Object.assign(actorFound, updateActorInput);
        const updatedActor = await actorFound.save();

        return updatedActor;
    };

    delete = async (id: number): Promise<boolean> => {
        const actorFound = await Actor.findOne({ where: { id } });

        if (!actorFound) {
            throw new Error(`The actor with id: ${id} does not exist!`);
        }

        await actorFound.remove();

        return true;
    };
}
