import {
  ObjectType,
  Field,
  ID,
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
} from 'type-graphql';
import { Service } from "typedi";
import {
  prisma,
} from './generated/prisma-client';

@InputType({ description: 'New book data'})
class BookCreateInput {
  @Field()
  title!: string;

  @Field()
  author!: string;

}

@ObjectType({ description: 'A book object/data type'})
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

  async create(args: BookCreateInput) {
    return prisma.createBook(args)
  }
}

@Resolver(() => Book)  // of => Book
export class BookResolver {
  private readonly bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  @Query(() => Book, { nullable: true }) // returns => Book
  async book(@Arg("id") id: string): Promise<Book | null> {
    return this.bookService.get(id);
  }

  @Query(() => [Book], { nullable: true }) // returns => [Book]
  async books(): Promise<Array<Book>> {
    return this.bookService.list();
  }

  @Mutation(() => Book)
  async addBook(@Arg('input') input: BookCreateInput): Promise<Book> {
    return this.bookService.create(input)
  }
}
