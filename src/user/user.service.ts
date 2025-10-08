import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

// user.service.ts
async create(dto: CreateUserDto): Promise<User> {
  const user = this.userRepo.create(dto); // creates a single User entity
  return await this.userRepo.save(user);  // returns a single User object
}


async findByEmail(email: string): Promise<User | null> {
  return this.userRepo.findOne({ where: { email } });
}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<User>) {
    return this.userRepo.update(id, data);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

}
