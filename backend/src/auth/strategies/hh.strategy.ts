import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-headhunter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HHOauthStrategy extends PassportStrategy(Strategy, 'headhunter') {
  constructor() {
    super({
      clientID: process.env.OAUTH_HH_ID,
      clientSecret: process.env.OAUTH_HH_SECRET,
      callbackURL: process.env.OAUTH_HH_REDIRECT_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    return done(null, { profile, accessToken, refreshToken });
  }
}
