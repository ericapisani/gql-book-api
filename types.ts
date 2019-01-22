import {
  ObjectType,
  Field,
  ID,
  FieldResolver,
  Resolver,
  Query,
  Mutation,
  Arg,
  Args,
  ArgsType,
  InputType,
  Root,
} from 'type-graphql';
import { Service } from "typedi";
import {
  prisma,
} from './generated/prisma-client';

@InputType({ description: 'New author data'})
class AuthorCreateInput {
  @Field()
  name!: string;
}

@InputType({ description: 'New book data'})
class BookCreateInput {
  @Field()
  title!: string;

  @Field()
  authorId!: string;
}

@ArgsType()
class BookArgs {
  @Field(() => ID, { nullable: true })
  authorId?: string;
}

@ObjectType({ description: 'A book object/data type'})
export class Book {
  @Field(() => ID) // type => Book
  id!: string;

  @Field()
  title!: string;

  @Field()
  authorId!: string;
}

@ObjectType({ description: 'An author'})
export class Author {
  @Field(() => ID) // type => Author
  id!: string;

  @Field()
  name!: string;

  @Field(() => [Book], { nullable: true })
  books?: Book[];
}
@Service()
class BookService {
  getBooksByAuthor({ authorId }: BookArgs): Promise<Book[]> {
    return prisma.books({where: { authorId }})
  }

  create(args: BookCreateInput): Promise<Book> {
    return prisma.createBook(args)
  }

  list(): Promise<Book[]> {
    return prisma.books();
  }
}

@Service()
class AuthorService {
  create(args: AuthorCreateInput): Promise<Author> {
    return prisma.createAuthor(args)
  }

  get(id: string): Promise<Author> {
    return prisma.author({ id })
  }

  list(): Promise<Author[]> {
    return prisma.authors()
  }
}
@Resolver(Book)
export class BookResolver {
  protected readonly bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  @Query(() => [Book])
  getBooksByAuthor(@Args() args: BookArgs): Promise<Book[]> {
    // root query - not preparing, just calling the service
    return this.bookService.getBooksByAuthor(args);
  }

  @Query(() => [Book])
  listBooks(): Promise<Book[]> {
    return this.bookService.list();
  }

  @Mutation(() => Book)
  async addBook(@Arg('input') input: BookCreateInput): Promise<Book> {
    return this.bookService.create(input)
  }
}
@Resolver(Author)
export class AuthorResolver {
  protected readonly bookService: BookService;
  protected readonly authorService: AuthorService

  constructor() {
    this.bookService = new BookService();
    this.authorService = new AuthorService();
  }

  @FieldResolver()
  books(@Root() author: Author): Promise<Book[]> {
    return this.bookService.getBooksByAuthor({ authorId: author.id});
  }

  @Query(() => Author) // returns => Author
  getAuthor(@Arg("id") id: string): Promise<Author | null> {
    return this.authorService.get(id);
  }

  @Query(() => [Author]) // returns => Author
  listAuthors(): Promise<Author[]> {
    return this.authorService.list();
  }

  @Mutation(() => Author)
  addAuthor(@Arg('input') input: AuthorCreateInput): Promise<Author> {
    return this.authorService.create(input)
  }
}
