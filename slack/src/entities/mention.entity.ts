import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Workspace } from './workspace.entity';
import { User } from './user.entity';

enum CategoryType {
  Chat = 'Chat',
  DM = 'DM',
  System = 'System',
}

const _ReceiverId = 'ReceiverId';
const _SenderId = 'SenderId';

@Entity()
export class Mention {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('enum', { enum: CategoryType })
  category: CategoryType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.Mentions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  Workspace: Workspace;

  @ManyToOne(() => User, (users) => users.MentionSources, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  Sender: User;

  @ManyToOne(() => User, (users) => users.MentionTargets, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  Receiver: User;
}
