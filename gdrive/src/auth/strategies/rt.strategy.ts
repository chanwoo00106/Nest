import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

type JwtPayload = {
  id: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookie = request.cookies?.refreshToken;
          console.log(cookie);
          if (!cookie) return null;
          return cookie;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  validate(req: Request, payload: JwtPayload) {
    console.log(payload);
    const refreshToken = req.cookies.refreshToken;
    return { ...payload, refreshToken };
  }
}
