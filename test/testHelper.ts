import {Connection, createConnection } from 'typeorm';

export class TestHelper {

    private static _instance: TestHelper;

    private constructor() {}

    public static get instance(): TestHelper {
        if(!this._instance) this._instance = new TestHelper();
        return this._instance;
    }

    private dbConnect!: Connection;

    async setupTestDB() {
        this.dbConnect = await createConnection({
            name: 'default',
            type: 'postgres',
            host: 'localhost',
            username: 'dposada',
            password : '',
            database: 'postgres_test',
            port: 5432,
            entities: [__dirname + '/../src/database/entity/*.{ts,js}'],
            migrations: [__dirname + '/../src/database/migrations/*.{ts,js}'],
            cli: {
                entitiesDir: __dirname + '/../src/database/entity',
                migrationsDir: __dirname + '/../src/database/migrations',
            },
            synchronize: true,
            dropSchema: true
        });
    }

    teardownTestDB() {
        this.dbConnect.close();
    }

}
