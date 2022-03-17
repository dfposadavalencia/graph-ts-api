// src/database/entity/Movie.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying", {length: 100})
    title: string;

    @Column("character varying", {length: 250})
    description: string;

    @Column({ type: 'text', array: true })
    actors: string[];

    @Column("character varying", { nullable: true, name: 'released_at', length: 100 })
    releaseYear: string;

    @CreateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @UpdateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
