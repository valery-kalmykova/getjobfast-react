import { Controller, Get, Request, UseGuards, Body, Post, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll(@Request() req: any): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Post('/create')
  async createUser(@Request() req: any, @Body() body: CreateUserDto): Promise<any> {
    return this.usersService.create(body);
  }

  @Post('/create-admin')
  async createAdmin(@Request() req: any, @Body() body: CreateAdminDto): Promise<any> {
    return this.usersService.createAdmin(body);
  }

  @Post('/remove-admin')
  async removeAdmin(@Request() req: any, @Body() body: CreateAdminDto): Promise<any> {
    return this.usersService.removeAdmin(body);
  }
}
