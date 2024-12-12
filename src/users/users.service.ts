import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async create(createUserDto: Partial<IUser>) {
    const newUser = this.users.create(createUserDto);
    await this.users.save(newUser);
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findById(id: string) {
    return await this.users.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.users.findOneBy({ email });
  }

  async update(id: string, updateUserDto: Partial<IUser>) {
    const userToUpdate = await this.findById(id);
    if (!userToUpdate) return;

    for (const field in updateUserDto) {
      userToUpdate[field as keyof IUser] = userToUpdate[field as keyof IUser];
    }
    this.users.save(userToUpdate);
    return userToUpdate;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
