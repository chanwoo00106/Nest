import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
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
    });
    this.userRepository.save(user);
    return;
  }
}
