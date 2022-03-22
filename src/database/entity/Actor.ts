import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn, ManyToMany, JoinTable,
} from 'typeorm';
import {Movie} from "./Movie";

@Entity()
export class Actor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying", {length: 100})
    name: string;

    @Column("character varying", {name: 'last_name',length: 100})
    lastName: string;

    @Column("date", {name: 'birthday_date'})
    birthdayDate: Date;

    @ManyToMany(type => Movie, movie => movie.actors)
    movies: Movie[];

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @UpdateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
