import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChannelChat } from './channel.chat.entity';
import { ChannelMember } from './channel.member.entity';
import { User } from './user.entity';
import { Workspace } from './workspace.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @Column('tinyint', {
    name: 'private',
    nullable: true,
    width: 1,
    default: 0,
  })
  private: boolean | null;

  @Column('int', { nullable: true, name: 'WorkspaceId' })
  WorkspaceId: number | null;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ChannelChat, (channelChat) => channelChat.Channel, {
    cascade: true,
  })
  ChannelChats: ChannelChat[];

  @OneToMany(() => ChannelMember, (channelMember) => channelMember.Channel, {
    cascade: true,
  })
  ChannelMembers: ChannelMember[];

  @ManyToMany(() => User, (user) => user.Channels)
  Members: User[];

  @ManyToOne(() => Workspace, (workspace) => workspace.Channels, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'WorkspaceId' })
  Workspace: Workspace;
}
