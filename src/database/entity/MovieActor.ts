import {
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import {Movie} from "./Movie";
import {Actor} from "./Actor";

@Entity("movie_actor")
export class MovieActor extends BaseEntity {
    @ManyToOne(type => Actor, actor => actor.movieActors, {primary: true})
    actor: Actor;

    @ManyToOne(type => Movie, movie => movie.movieActors, {primary: true})
    movie: Movie;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @UpdateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
