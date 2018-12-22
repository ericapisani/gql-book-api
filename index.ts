// Needs to be the first import for this to work (related to the
// type-graphql package)
import "reflect-metadata";

import { buildSchema } from 'type-graphql'
// const { ApolloServer, gql } = require('apollo-server');
const { ApolloServer } = require('apollo-server');
// import { prisma } from './generated/prisma-client';
// import { IBook } from './types';
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
// const typeDefs = gql`
//   type Book {
//     id: ID!
//     title: String
//     author: String
//   }

//   type Query {
//     books: [Book]
//     book(id: ID!): Book
//   }
// `;

// const resolvers = {
//   Query: {
//     books: (): Promise<Array<IBook>> => {
//       return prisma.books();
//     },
//     book: (_: any, args: any): Promise<IBook> => {
//       return prisma.book({ id: args.id })
//     }
//   }
// };

// const server = new ApolloServer({ typeDefs, resolvers });
