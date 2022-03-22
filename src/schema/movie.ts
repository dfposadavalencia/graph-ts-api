import {Field, ObjectType, InputType, Int} from 'type-graphql';
import { Length } from 'class-validator';
import {Actor, CreateActorInput} from "./actor";
import {ManyToMany} from "typeorm";

@ObjectType()
export class Movie {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    description: string;

    @Field(type => [Actor])
    @ManyToMany(type => Actor, actor => actor.movies, { cascade: true })
    actors: Actor[];

    @Field(type => String)
    releaseYear: string;

    @Field(type => Date)
    updatedAt: Date;

    @Field(type => Date)
    createdAt: Date;
}

@InputType()
export class CreateMovieInput implements Partial<Movie> {
    @Field(type => String)
    @Length(2, 50)
    title: string;

    @Field(type => String)
    @Length(10, 250)
    description: string;

    @Field(type => [CreateActorMovieInput], {nullable: true})
    movie_actors: CreateActorMovieInput[];

    @Field(type => String, { nullable: true })
    releaseYear: string;
}

@InputType()
export class CreateActorMovieInput implements Partial<Actor>{
    @Field(type => Int)
    id: number;
}

@InputType()
export class UpdateMovieInput implements Partial<Movie> {
    @Field(type => String, {nullable: true})
    @Length(2, 50)
    title?: string;
}
