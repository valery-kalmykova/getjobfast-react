import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '10111991',
    //   database: 'getjobfast',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    UsersModule,
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
