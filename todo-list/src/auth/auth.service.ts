import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/Entity/auth.entity';
import { Repository } from 'typeorm';
import { userDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async register(user: userDto) {
    const result = await this.authRepository.findOne({
      username: user.username,
    });

    if (result) throw new BadRequestException();

    const hash = await bcrypt.hash(user.password, 10);
    const { username } = await this.authRepository.save({
      username: user.username,
      password: hash,
    });
    return username;
  }
}
