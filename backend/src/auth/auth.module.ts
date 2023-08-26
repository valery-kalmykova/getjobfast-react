import { Module } from '@nestjs/common';
// import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { HHOauthStrategy } from './strategies/hh.strategy';
import { AuthController } from './auth.controller';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [
    // UsersModule,
    // ApiModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '7d',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, HHOauthStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}