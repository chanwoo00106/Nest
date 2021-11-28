import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user.entity';

const _ChannelId = 'ChannelId';
const _UserId = 'UserId';

@Entity()
export class ChannelMember {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @PrimaryColumn({ type: 'int', name: _ChannelId })
  ChannelId: number;

  @PrimaryColumn({ type: 'int', name: _UserId })
  UserId: number;

  @ManyToOne(() => Channel, (channel) => channel.ChannelMembers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: _ChannelId })
  Channel: Channel;

  @ManyToOne(() => User, (user) => user.ChannelMembers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: _UserId })
  User: User;
}
