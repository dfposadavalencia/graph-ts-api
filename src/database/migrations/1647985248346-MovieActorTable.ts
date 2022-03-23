import {MigrationInterface, QueryRunner} from "typeorm";

export class MovieActorTable1647985248346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS movie_actor
        (movie_id INT REFERENCES movie (id) ON UPDATE CASCADE ON DELETE CASCADE,
        actor_id INT REFERENCES actor (id) ON UPDATE CASCADE ON DELETE CASCADE,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP NOT NULL DEFAULT NOW())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movie_actor');
    }

}
