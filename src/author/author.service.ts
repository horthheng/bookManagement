import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from 'src/entities/author.entity';
@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}

  create(data: Partial<Author>) {
    const author = this.authorRepo.create(data);
    return this.authorRepo.save(author);
  }

  findAll() {
    return this.authorRepo.find();
  }

  findOne(id: number) {
    return this.authorRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<Author>) {
    return this.authorRepo.update(id, data);
  }

  remove(id: number) {
    return this.authorRepo.delete(id);
  }
}
