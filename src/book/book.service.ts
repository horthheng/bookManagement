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
  });
  return this.bookRepo.save(book);
}

  findAll() {
    return this.bookRepo.find();
  }

  findOne(id: number) {
    return this.bookRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<Book>) {
    return this.bookRepo.update(id, data);
  }

  remove(id: number) {
    return this.bookRepo.delete(id);
  }
}
