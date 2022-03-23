import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import {MovieActor} from "./MovieActor";

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying", {length: 100})
    title: string;

    @Column("character varying", {length: 250})
    description: string;

    @OneToMany(type => MovieActor, movieActor => movieActor.movie, { cascade: true, nullable: true })
    movieActors: MovieActor[];

    @Column("character varying", { nullable: true, name: 'release_year', length: 100 })
    releaseYear: string;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @UpdateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
