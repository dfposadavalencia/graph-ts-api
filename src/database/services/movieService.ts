import { Service } from 'typedi';
import { Movie } from '../entity/Movie';
import { CreateMovieInput, UpdateMovieInput } from '../../schema/movie';
import {Actor} from "../entity/Actor";

@Service()
export class MovieService {

    getAll = async (): Promise<Movie[]> => {
        return await Movie.find({relations:["actors"], order: {["id"]: 'ASC'}, loadRelationIds: false});
    };

    getOne = async (id: number): Promise<Movie | undefined> => {
        const movie = await Movie.findOne(id , {relations:["actors"]});

        if (!movie) {
            throw new Error(`The movie with id: ${id} does not exist!`);
        }
        return movie;
    };

    create = async (createMovieInput: CreateMovieInput): Promise<Movie> => {
        let movie = Movie.create(createMovieInput);

        movie.actors = [];
        for (let actorId of createMovieInput.movie_actors) {
            // @ts-ignore
            movie.actors.push(await Actor.findOne(actorId.id));
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
