import {MigrationInterface, QueryRunner} from "typeorm";

export class ActorTable1647630329156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`CREATE TABLE IF NOT EXISTS actor
        (id SERIAL PRIMARY KEY, 
        name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        birthday_date TIMESTAMP NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP NOT NULL DEFAULT NOW())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('actor');
    }

}
