import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import mongodbConfig from './shared/config/mongodb.config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [mongodbConfig],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     useCreateIndex: true,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     uri: configService.get<string>('mongodb.uri'),
    //   }),
    //   inject: [ConfigService],
    // }),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  // constructor(private dataSource: DataSource) {}
}
