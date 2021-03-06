import {Field, ObjectType, InputType, Int} from 'type-graphql';
import {Length} from "class-validator";
import {OneToMany} from "typeorm";
import {MovieActor} from "./movieActorSchema";

@ObjectType()
export class Actor {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    name: string;

    @Field(type => String)
    lastName: string;

    @Field(type => Date)
    birthdayDate: Date;

    @Field((type) => [MovieActor])
    @OneToMany(type => MovieActor, movieActor => movieActor.actor, { cascade: true })
    movieActors: MovieActor[];

    @Field(type => Date)
    updatedAt: Date;

    @Field(type => Date)
    createdAt: Date;
}

@InputType()
export class CreateActorInput implements Partial<Actor> {
    @Field(type => String)
    @Length(2, 100)
    name: string;

    @Field(type => String)
    @Length(0, 250)
    lastName: string;

    @Field(type => Date, { nullable: true })
    birthdayDate: Date;
}

@InputType()
export class UpdateActorInput implements Partial<Actor> {
    @Field(type => String, {nullable: true})
    @Length(2, 50)
    name?: string;
}
