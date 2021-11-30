import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  async join(email: string, nickname: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException();
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
