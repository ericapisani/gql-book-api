const { ApolloServer, gql } = require('apollo-server');
import { prisma } from './generated/prisma-client';
import { IBook } from './types';

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;

const resolvers = {
  Query: {
    books: (): Promise<Array<IBook>> => {
      return prisma.books();
    },
    book: (_: any, args: any): Promise<IBook> => {
      return prisma.book({ id: args.id })
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url } : { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
