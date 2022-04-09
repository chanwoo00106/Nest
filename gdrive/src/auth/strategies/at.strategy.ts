import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookie = request.cookies?.accessToken;
          console.log(cookie);
          if (!cookie) return null;
          return cookie;
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    console.log(payload);
    return payload;
  }
}
