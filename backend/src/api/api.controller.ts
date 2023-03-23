import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiService } from './api.service';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('me')
  async getUser(@Req() req: any) {
    const accessToken = req.user.accessToken;
    return this.apiService.getUser(accessToken);
  }

  @Get('resumes/mine')
  async getResumes(@Req() req: any) {
    const accessToken = req.user.accessToken;
    return this.apiService.getResumes(accessToken);
  }

  @Get('resumes/:resumes_id/similar_vacancies/:page')
  async getVacanciesSimilarToResume(
    @Req() req: any,
    @Param('resumes_id') resumes_id: string,
    @Param('page') page: string,
  ) {
    const accessToken = req.user.accessToken;
    const vacancies = await this.apiService.getVacanciesSimilarToResume(
      accessToken,
      resumes_id,
      page,
    );
    return vacancies;
  }

  @Post('negotiations')
  @UseInterceptors(FileInterceptor('file'))
  async sendNegotiation(@Body() body: any, @Req() req: any) {
    const accessToken = req.user.accessToken;
    return this.apiService.sendNegotiation(accessToken, body);
  }
}
