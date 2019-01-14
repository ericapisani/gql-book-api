const { ApolloServer, gql } = require('apollo-server');
import {
  prisma,
  BookCreateInput,
} from './generated/prisma-client';
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

  type Mutation {
    createBook(title: String!, author: String!): Book
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
  },
  Mutation: {
    createBook:(_: any, args: BookCreateInput): Promise<IBook> => {
      return prisma.createBook(args)
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url } : { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
