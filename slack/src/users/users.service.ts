import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMebersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
  ) {}
  async join(email: string, nickname: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException();
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const returned = await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
    await this.workspaceMebersRepository.save({
      UserId: returned.id,
      WorkspaceId: 1,
    });
    await this.channelMembersRepository.save({
      UserId: returned.id,
      ChannelId: 1,
    });
    return true;
  }
}
