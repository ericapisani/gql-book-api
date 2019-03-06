"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Needs to be the first import for this to work (related to the
// type-graphql package)
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
// const { ApolloServer, gql } = require('apollo-server');
const { ApolloServer } = require('apollo-server');
// import { prisma } from './generated/prisma-client';
// import { IBook } from './types';
const types_1 = require("./types");
const resolvers = [types_1.BookResolver];
let schema;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        schema = yield type_graphql_1.buildSchema({
            resolvers,
        });
        const server = new ApolloServer({ schema });
        server.listen().then(({ url }) => {
            console.log(`🚀  Server ready at ${url}`);
        });
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
