import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/entities/book.entity';
import { Author } from 'src/entities/author.entity';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}

async create(data: any) {
  const author = await this.authorRepo.findOne({ where: { id: data.authorId } });
  if (!author) throw new Error('Author not found');

    const book = this.bookRepo.create({
      title: data.title,
      author,
      image: data.image,
    });
  return this.bookRepo.save(book);
}

  findAll() {
    return this.bookRepo.find();
  }

  findOne(id: number) {
    return this.bookRepo.findOneBy({ id });
  }

async update(id: number, data: any) {
  const book = await this.bookRepo.findOne({ where: { id } });
  if (!book) throw new Error('Book not found');
  // Update title
  if (data.title) {
    book.title = data.title;
  }
  // Update author
  if (data.authorId) {
    const author = await this.authorRepo.findOne({ where: { id: data.authorId } });
    if (!author) throw new Error('Author not found');
    book.author = author;
  }
if (data.image !== undefined) book.image = data.image
  return this.bookRepo.save(book);
}


  remove(id: number) {
    return this.bookRepo.delete(id);
  }
}
