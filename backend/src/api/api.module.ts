import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })
  ],
  providers: [ApiService],
  controllers: [ApiController],
  exports: [ApiService],
})
export class ApiModule {}
