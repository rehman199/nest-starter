import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  create(createUserDto: IUser) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findById(id: string) {
    return this.users.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.users.findOneBy({ email });
  }

  update(id: number, updateUserDto: Partial<IUser>) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
