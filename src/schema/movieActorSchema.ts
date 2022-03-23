import {Field, ObjectType} from 'type-graphql';
import {Actor} from "./actorSchema";
import {Movie} from "./movieSchema";
import {ManyToOne} from "typeorm";

@ObjectType()
export class MovieActor {
    @Field(type => Movie)
    @ManyToOne(type => Movie, movie => movie.movieActors, { cascade: true, nullable: true })
    movie: Movie;

    @Field(type => Actor)
    @ManyToOne(type => Actor, actor => actor.movieActors, { cascade: true, nullable: true })
    actor: Actor;

    @Field(type => Date)
    updatedAt: Date;

    @Field(type => Date)
    createdAt: Date;
}
/*
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
*/
