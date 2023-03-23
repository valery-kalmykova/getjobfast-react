import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
// import { ApiService } from 'src/api/api.service';
// import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { HHAuthGuard } from './guards/hh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    // private apiService: ApiService,
    // private usersService: UsersService,
  ) {}

  @UseGuards(HHAuthGuard)
  @Get('login')
  async login() {
    return;
  }

  @UseGuards(HHAuthGuard)
  @Get() //redirect
  async hhAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { user } = req;
    if (!user) {
      res.redirect('/');
      return;
    }
    const token = await this.authService.login(req.user);
    const { access_token } = token;
    // const userInfo = await this.apiService.getUser(access_token);
    // await this.usersService.create(userInfo);
    res.cookie('authorization', access_token);
    res.redirect('http://45.84.224.70/login');
  }
}
