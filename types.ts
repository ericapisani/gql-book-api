import {
  ObjectType,
  Field,
  ID,
  Resolver,
  Query,
  Arg,
} from 'type-graphql';
import { Service } from "typedi";
import { prisma } from './generated/prisma-client';

export interface IBook {
  id: string;
  author: string;
  title: string;
}

@ObjectType()
export class Book {
  @Field(() => ID) // type => Book
  id: string;

  @Field()
  author: string;

  @Field()
  title: string;

  constructor({
    id,
    author,
    title,
  }: {
    id: string,
    author: string,
    title: string,
  }) {
    this.id = id;
    this.author = author;
    this.title = title;
  }
}

@Service()
export class BookService {
  async list() {
    return prisma.books();
  }

  async get(id: string) {
    return prisma.book({ id })
  }
}

@Service()
@Resolver(() => Book)  // of => Book
export class BookResolver {
  private readonly bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  @Query(() => Book) // returns => Book
  async book(@Arg("id") id: string) {
    // usage of the injected service
    return this.bookService.get(id);
  }

  @Query(() => [Book]) // returns => Book
  async books() {
    // usage of the injected service
    return this.bookService.list();
  }
}
