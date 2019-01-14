// Needs to be the first import for this to work (related to the
// type-graphql package)
import "reflect-metadata";

import { buildSchema } from 'type-graphql'
const { ApolloServer } = require('apollo-server');
import { BookResolver } from './types'

const resolvers = [BookResolver]
let schema

async function startServer() {
  schema = await buildSchema({
    resolvers,
    emitSchemaFile: true,
  });

  const server = new ApolloServer({ schema })

  server.listen().then(({ url } : { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

}

startServer();
