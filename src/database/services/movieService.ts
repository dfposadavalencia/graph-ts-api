import { Service } from 'typedi';
import { Movie } from '../entity/Movie';
import { CreateMovieInput, UpdateMovieInput } from '../../schema/movieSchema';
import {MovieActor} from "../entity/MovieActor";
import {Actor} from "../entity/Actor";

@Service()
export class MovieService {

    getAll = async (): Promise<Movie[]> => {
        return await Movie.find({
            relations: ["movieActors", "movieActors.actor"],
            order: {["id"]: 'ASC'}
        });
    };

    getOne = async (id: number): Promise<Movie | undefined> => {
        const movie = await Movie.findOne(id , {relations:["movieActors", "movieActors.actor"]});

        if (!movie) {
            throw new Error(`The movie with id: ${id} does not exist!`);
        }
        return movie;
    };

    create = async (createMovieInput: CreateMovieInput): Promise<Movie> => {
        let movie = Movie.create(createMovieInput);
        const new_movie = await movie.save();
        movie.movieActors = [];
        for (let actorId of createMovieInput.actors) {
            const movieActors = new MovieActor();
            movieActors.movie = new_movie;
            // @ts-ignore
            movieActors.actor = await Actor.findOne(actorId.id);
            movie.movieActors.push(movieActors);
        }

        return await movie.save();
    };

    update = async (
        id: number,
        updateMovieInput: UpdateMovieInput,
    ): Promise<Movie> => {
        const movieFound = await Movie.findOne({ where: { id } });

        if (!movieFound) {
            throw new Error(`The movie with id: ${id} does not exist!`);
        }

        Object.assign(movieFound, updateMovieInput);
        const updatedMovie = await movieFound.save();

        return updatedMovie;
    };

    delete = async (id: number): Promise<boolean> => {
        const movieFound = await Movie.findOne({ where: { id } });

        if (!movieFound) {
            throw new Error(`The movie with id: ${id} does not exist!`);
        }

        await movieFound.remove();

        return true;
    };
}
