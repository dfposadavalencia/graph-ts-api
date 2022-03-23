import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import {MovieActor} from "./MovieActor";

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

    @OneToMany(type => MovieActor, movieActor => movieActor.actor, { cascade: true, nullable: true })
    movieActors: MovieActor[];

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @UpdateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
