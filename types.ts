export interface IBook {
  id: string;
  author: string;
  title: string;
}

export class Book {
  id: string;
  author: string;
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
