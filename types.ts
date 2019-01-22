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
  id: string;

  @Field()
  title: string;

  @Field()
  authorId: string;

  constructor({
    id,
    title,
    authorId,
  }: {
    id: string,
    title: string,
    authorId: string,
  }) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
  }
}

@ObjectType({ description: 'An author'})
export class Author {
  @Field(() => ID) // type => Author
  id: string;

  @Field()
  name: string;

  @Field(() => [Book], { nullable: true })
  books?: Book[];

  constructor({
    id,
    name,
    books,
  }: {
    id: string,
    name: string,
    books: Book[],
  }) {
    this.id = id;
    this.name = name;
    this.books = books;
  }
}


@Service()
class BookService {
  getBooks({ authorId }: BookArgs): Promise<Book[]> {
    return prisma.books({where: { authorId }})
  }

  create(args: BookCreateInput): Promise<Book> {
    return prisma.createBook(args)
  }

}

@Service()
class AuthorService {
  create(args: AuthorCreateInput): Promise<Author> {
    return prisma.createAuthor(args)
  }

  getBooks({ authorId }: BookArgs): Promise<Book[]> {
    return prisma.books({where: { authorId }})
  }
}


@Resolver(Book)
export class BookResolver {
  protected readonly bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  @Query(() => [Book])
  getBooks(@Args() args: BookArgs) {
    // root query - not preparing, just calling the service
    return this.bookService.getBooks(args);
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
  books(@Root() author: Author, @Args() args: BookArgs) {
    // preparing your args based on context
    args.authorId = author.id;
    // and calling the common resolver service
    return this.bookService.getBooks(args);
  }

  @Mutation(() => Author)
  async addAuthor(@Arg('input') input: AuthorCreateInput): Promise<Author> {
    return this.authorService.create(input)
  }

}

// @Service()
// export class BookService {
//   async list() {
//     return prisma.books();
//   }

//   async get(id: string) {
//     return prisma.book({ id })
//   }

//   async create(args: BookCreateInput) {
//     return prisma.createBook(args)
//   }
// }

// @Service()
// export class AuthorService {
//   async list() {
//     return prisma.authors();
//   }

//   async get(id: string) {
//     return prisma.author({ id })
//   }

//   async create(args: AuthorCreateInput) {
//     return prisma.createAuthor(args)
//   }
// }


// @Resolver(() => Book)  // of => Book
// export class BookResolver {
//   private readonly bookService: BookService;

//   constructor() {
//     this.bookService = new BookService();
//   }

//   @Query(() => Book, { nullable: true }) // returns => Book
//   async book(@Arg("id") id: string): Promise<Book | null> {
//     return this.bookService.get(id);
//   }

//   @Query(() => [Book], { nullable: true }) // returns => [Book]
//   async books(): Promise<Array<Book>> {
//     return this.bookService.list();
//   }

//   @Mutation(() => Book)
//   async addBook(@Arg('input') input: BookCreateInput): Promise<Book> {
//     return this.bookService.create(input)
//   }
// }
// @Resolver(() => Author)  // of => Author
// export class AuthorResolver {
//   private readonly authorService: AuthorService;

//   constructor() {
//     this.authorService = new AuthorService();
//   }

//   @Query(() => Author, { nullable: true }) // returns => Author
//   async author(@Arg("id") id: string): Promise<Author | null> {
//     return this.authorService.get(id);
//   }

//   @Query(() => [Author], { nullable: true }) // returns => [Author]
//   async authors(): Promise<Array<Author>> {
//     return this.authorService.list();
//   }

//   @Mutation(() => Author)
//   async addAuthor(@Arg('input') input: AuthorCreateInput): Promise<Author> {
//     return this.authorService.create(input)
//   }
// }
