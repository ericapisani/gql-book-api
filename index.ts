const { ApolloServer, gql } = require('apollo-server');
import { prisma } from './generated/prisma-client';

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: async () => {
      return await prisma.books();
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url } : { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
