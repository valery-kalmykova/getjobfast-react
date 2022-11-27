import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { User } from './user.entity';

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(User)
  //   private UserRepository: Repository<User>,
  // ) {}
  // async findOne(id: string): Promise<User> {
  //   const user = await this.UserRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   if (!user) {
  //     throw new NotFoundException();
  //   }
  //   return user;
  // }
}
