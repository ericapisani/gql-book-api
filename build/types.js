"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const prisma_client_1 = require("./generated/prisma-client");
let Book = class Book {
    constructor({ id, author, title, }) {
        this.id = id;
        this.author = author;
        this.title = title;
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID) // type => Book
    ,
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
Book = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Object])
], Book);
exports.Book = Book;
let BookResolver = class BookResolver {
    constructor(
    // constructor injection of the service
    bookService) {
        this.bookService = bookService;
    }
    book(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            // usage of the injected service
            return this.bookService.get(bookId);
        });
    }
    books() {
        return __awaiter(this, void 0, void 0, function* () {
            // usage of the injected service
            return this.bookService.list();
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Book) // returns => Book
    ,
    __param(0, type_graphql_1.Arg("bookId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "book", null);
__decorate([
    type_graphql_1.Query(() => [Book]) // returns => Book
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "books", null);
BookResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(() => Book) // of => Book
    ,
    __metadata("design:paramtypes", [BookService])
], BookResolver);
exports.BookResolver = BookResolver;
let BookService = class BookService {
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.prisma.books();
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_client_1.prisma.book({ id });
        });
    }
};
BookService = __decorate([
    typedi_1.Service()
], BookService);
exports.BookService = BookService;
