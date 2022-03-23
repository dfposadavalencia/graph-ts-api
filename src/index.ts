import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import express from 'express';
import initializeDB from './database/index';
import { ActorResolver } from "./resolvers/actorResolver";
import { MovieResolver } from './resolvers/movieResolver';

const app = express();

async function main() {
    await initializeDB();
    const schema = await buildSchema({
        resolvers: [MovieResolver, ActorResolver],
        container: Container,
        emitSchemaFile: true
    });
    const server = new ApolloServer({
        schema,
    });

    await server.start();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 5000;

    app.listen(port, () =>
        console.log(`Server is running on http://localhost:${port}/graphql`),
    );
}

main();
