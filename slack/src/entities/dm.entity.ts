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

const _SenderId = 'SenderId';
const _ReceiverId = 'ReceiverId';

@Entity()
export class Dm {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.DMs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  Workspace: Workspace;

  @ManyToOne(() => User, (user) => user.DMSources, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  Sender: User;

  @ManyToOne(() => User, (user) => user.DMTargets, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  Receiver: User;
}
