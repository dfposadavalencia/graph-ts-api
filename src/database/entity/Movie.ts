import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import {Actor} from "./Actor";

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying", {length: 100})
    title: string;

    @Column("character varying", {length: 250})
    description: string;

    @ManyToMany(type => Actor, actor => actor.movies, { cascade: true })
    @JoinTable({name:""})
    actors: Actor[];

    @Column("character varying", { nullable: true, name: 'release_year', length: 100 })
    releaseYear: string;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @UpdateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
