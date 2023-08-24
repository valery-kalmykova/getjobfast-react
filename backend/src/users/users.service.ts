import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { ApiService } from 'src/api/api.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // private apiRepository: ApiService,
  ) {}

  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find({
      order: {
          id: "DESC",
      },
  })
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        ...updateUserDto,
      })
      .where('id = :id', { id: id })
      .returning('*')
      .updateEntity(true)
      .execute();
    return result.raw[0];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (userByEmail) {
      const { id } = userByEmail;
      return await this.updateById(id, createUserDto);
    }
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
}

