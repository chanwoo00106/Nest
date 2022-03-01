import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getToken(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        { expiresIn: 60 * 15, secret: 'at-secret' },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        { expiresIn: 60 * 15, secret: 'rt-secret' },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signupLocal(data: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(data.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        hash,
      },
    });

    const tokens = await this.getToken(newUser.id, newUser.email);
    return tokens;
  }

  signinLocal() {}

  logout() {}

  refreshTokens() {}
}
