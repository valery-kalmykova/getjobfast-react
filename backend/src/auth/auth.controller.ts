import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { HHAuthGuard } from './guards/hh-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
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
    const host = this.configService.get<string>('HOST');
    res.cookie('authorization', access_token);
    res.redirect(`http://${host}/login`);
  }
}
