import {Field, ObjectType, InputType, Int} from 'type-graphql';
import { Length } from 'class-validator';
import {Actor, CreateActorInput} from "./actorSchema";
import {OneToMany} from "typeorm";
import {MovieActor} from "./movieActorSchema";

@ObjectType()
export class Movie {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    description: string;

    @Field((type) => [MovieActor])
    @OneToMany(type => MovieActor, movieActor => movieActor.movie, {nullable: true})
    movieActors: MovieActor[];

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
    actors: CreateActorMovieInput[];

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
