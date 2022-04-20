import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users';
import { Repository } from 'typeorm';

type JwtPayload = {
  id: string;
};

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-rt') {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const cookie = req.cookies['refreshToken'];
          if (!cookie) return null;
          return cookie;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.id) return false;
    const user = await this.userRepository.findOne(payload.id);
    if (!user) return false;
    return { ...payload };
  }
}
