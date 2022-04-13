import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users';
import { Repository } from 'typeorm';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  async register(data: RegisterDto) {
    if (data.wifiPw !== this.configService.get<string>('WIFI_PASSWORD'))
      throw new ForbiddenException('Not matched wifi password');
    else if (await this.userRepository.findOne({ id: data.id }))
      throw new ForbiddenException('already exist id');

    const hash = await bcrypt.hash(data.password, 10);
    const user = this.userRepository.create({
      id: data.id,
      password: hash,
      files: null,
      refresh: null,
    });
    this.userRepository.save(user);
    return;
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.findOne({ id: data.id });
    if (!user) throw new BadRequestException('Not Found user');

    if (!(await bcrypt.compare(data.password, user.password)))
      throw new ForbiddenException('Not matched password');

    const tokens = await this.getToken(user.id);
    await this.userRepository.update(
      { id: user.id },
      { refresh: bcrypt.hashSync(tokens.refreshToken, 10) },
    );
    return tokens;
  }

  async refresh({ id }: { id: string }) {
    const tokens = await this.getToken(id);
    await this.userRepository.update(
      { id: id },
      { refresh: bcrypt.hashSync(tokens.refreshToken, 10) },
    );
    return tokens;
  }

  private async getToken(id: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
        },
        {
          expiresIn: 60 * 15,
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
