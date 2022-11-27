import { Controller, Get, Request, UseGuards } from '@nestjs/common';
// import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('/me')
  // findMe(@Request() req: any): Promise<User> {
  //   return this.usersService.findOne(req.user.userId);
  // }
}
