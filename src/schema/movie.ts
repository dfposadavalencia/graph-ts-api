import {Field, ObjectType, InputType, Int} from 'type-graphql';
import { Length } from 'class-validator';

@ObjectType()
export class Movie {
    @Field(type => Int)
    id: number;

    @Field(type => String)
    title: string;

    @Field(type => String)
    description: string;

    @Field((type) => [String])
    actors: string[];

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

    @Field((type) => [String])
    actors: string[];

    @Field(type => String, { nullable: true })
    releaseYear: string;
}

@InputType()
export class UpdateMovieInput implements Partial<Movie> {
    @Field(type => String, {nullable: true})
    @Length(2, 50)
    title?: string;
}
