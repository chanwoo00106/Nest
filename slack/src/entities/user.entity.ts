import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChannelChat } from './channel.chat.entity';
import { Channel } from './channel.entity';
import { ChannelMember } from './channel.member.entity';
import { Dm } from './dm.entity';
import { Mention } from './mention.entity';
import { WorkspaceMember } from './workspace.member.entity';
import { Workspace } from './workspace.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    required: true,
    example: 'seongho4996@naver.com',
    description: '이메일',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @ApiProperty({
    required: true,
    example: '진성호',
    description: '닉네임',
  })
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'password',
    description: '비밀번호',
  })
  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ChannelChat, (channelChat) => channelChat.User)
  ChannelChats: ChannelChat[];

  @OneToMany(() => ChannelMember, (channelMember) => channelMember.User)
  ChannelMembers: ChannelMember[];

  @ManyToMany(() => Channel, (channel) => channel.Members)
  @JoinTable({
    name: 'channel_member',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ChannelId',
      referencedColumnName: 'id',
    },
  })
  Channels: Channel[];

  @OneToMany(() => Dm, (dm) => dm.Sender)
  DMSources: Dm[];

  @OneToMany(() => Dm, (dm) => dm.Receiver)
  DMTargets: Dm[];

  @OneToMany(() => Mention, (mention) => mention.Sender)
  MentionSources: Mention[];

  @OneToMany(() => Mention, (mention) => mention.Receiver)
  MentionTargets: Mention[];

  @OneToMany(() => WorkspaceMember, (workspace) => workspace.User)
  WorkspaceMembers: WorkspaceMember[];

  @OneToMany(() => Workspace, (workspace) => workspace.Owner)
  OwnedWorkspaces: Workspace[];

  @ManyToMany(() => Workspace, (workspace: Workspace) => workspace.Members)
  @JoinTable({
    name: 'workspace_member',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'WorkspaceId',
      referencedColumnName: 'id',
    },
  })
  Workspaces: Workspace[];
}
