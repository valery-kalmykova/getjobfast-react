import { Controller, Get, Request, UseGuards, Body, Post, Param } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll(@Request() req: any): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post('/create')
  async createUser(@Request() req: any, @Body() body: CreateUserDto): Promise<any> {
    return this.usersService.create(body);
  }
}
