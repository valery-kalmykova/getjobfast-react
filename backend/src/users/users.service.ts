import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { ApiService } from 'src/api/api.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { USER_ROLE } from './types/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) // private apiRepository: ApiService,
  {}

  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find({
      order: {
        id: 'DESC',
      },
    });
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

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
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

  async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    const { email, secret } = createAdminDto;
    if (secret === process.env.SECRET_ADMIN_KEY) {
      const userByEmail = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      const { id } = userByEmail;
      const result = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          role:USER_ROLE.admin,
        })
        .where('id = :id', { id: id })
        .returning('*')
        .updateEntity(true)
        .execute();
      return result.raw[0];
    }
  }

  async removeAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    const { email, secret } = createAdminDto;
    if (secret === process.env.SECRET_ADMIN_KEY) {
      const userByEmail = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      const { id } = userByEmail;
      const result = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          role:USER_ROLE.user,
        })
        .where('id = :id', { id: id })
        .returning('*')
        .updateEntity(true)
        .execute();
      return result.raw[0];
    }
  }
}
