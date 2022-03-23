import {Query, Resolver, Mutation, Arg, Int} from 'type-graphql';
import { Service } from 'typedi';
import { Actor, CreateActorInput, UpdateActorInput } from '../schema/actorSchema';
import { ActorService } from '../database/services/actorService';

@Service()
@Resolver(Actor)
export class ActorResolver {
    constructor(private actorService: ActorService) {}

    @Query((returns) => [Actor], { nullable: true })
    async getActors(): Promise<Actor[]> {
        return await this.actorService.getAll();
    }

    @Query((returns) => Actor, { nullable: true })
    async getActor(@Arg('id', type => Int) id: number): Promise<Actor | undefined> {
        return await this.actorService.getOne(id);
    }

    @Mutation((returns) => Actor)
    async addActor(
        @Arg('ActorInput', type => CreateActorInput) createActorInput: CreateActorInput,
    ): Promise<Actor> {
        return await this.actorService.create(createActorInput);
    }

    @Mutation((returns) => Actor)
    async updateActor(
        @Arg('id', type => Int) id: number,
        @Arg('ActorInput', type => UpdateActorInput) updateActorInput: UpdateActorInput,
    ): Promise<Actor> {
        return await this.actorService.update(id, updateActorInput);
    }

    @Mutation((returns) => Boolean)
    async deleteActor(@Arg('id', type => Int) id: number): Promise<boolean> {
        return await this.actorService.delete(id);
    }
}
