import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async register(data: RegisterDto) {
    if (data.wifiPw !== this.configService.get<string>('WIFI_PASSWORD'))
      throw new ForbiddenException('Not matched wifi password');
    else if (
      await this.prismaService.users.findFirst({ where: { id: data.id } })
    )
      throw new ForbiddenException('already exist id');

    const hash = await bcrypt.hash(data.password, 10);
    await this.prismaService.users.create({
      data: { id: data.id, password: hash, refresh: null },
    });
    return;
  }

  async login(data: LoginDto) {
    const user = await this.prismaService.users.findFirst({
      where: { id: data.id },
    });
    if (!user) throw new BadRequestException('Not Found user');

    if (!(await bcrypt.compare(data.password, user.password)))
      throw new ForbiddenException('Not matched password');

    const tokens = await this.getToken(user.id);
    await this.prismaService.users.update({
      where: { id: user.id },
      data: { refresh: bcrypt.hashSync(tokens.refreshToken, 10) },
    });
    return tokens;
  }

  async refresh({ id }: { id: string }) {
    const tokens = await this.getToken(id);
    await this.prismaService.users.update({
      where: { id },
      data: { refresh: bcrypt.hashSync(tokens.refreshToken, 10) },
    });
    return tokens;
  }

  async logout(id: string) {
    if (!(await this.prismaService.users.findFirst({ where: { id } })))
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    await this.prismaService.users.update({
      where: { id },
      data: { refresh: '' },
    });
  }

  private async getToken(id: string) {
    const [at, rt, RtExpiredAt, AtExpiredAt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: id,
        },
        {
          expiresIn: 60 * 15,
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          id: id,
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      ),
      new Date().setSeconds(new Date().getSeconds() + 604800),
      new Date().setSeconds(new Date().getSeconds() + 900),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
      AtExpiredAt,
      RtExpiredAt,
    };
  }
}
