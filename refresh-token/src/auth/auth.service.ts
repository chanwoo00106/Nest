import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async signupLocal(data: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(data.password);

    const newUser = this.prisma.user.create({
      data: {
        email: data.email,
        hash,
      },
    });
  }

  signinLocal() {}

  logout() {}

  refreshTokens() {}
}
