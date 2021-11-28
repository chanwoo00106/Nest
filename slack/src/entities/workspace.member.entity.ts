import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Workspace } from './workspace.entity';
import { User } from './user.entity';

const _WorkspaceId = 'WorkspaceId';

const _UserId = 'UserId';

@Entity()
export class WorkspaceMember {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @PrimaryColumn({ name: _WorkspaceId })
  WorkspaceId: number;

  @PrimaryColumn({ name: _UserId })
  UserId: number;

  @Column('datetime', { nullable: true })
  loggedInAt: Date;

  @ManyToOne(() => Workspace, (workspace) => workspace.WorkspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: _WorkspaceId })
  Workspace: Workspace;

  @ManyToOne(() => User, (user) => user.WorkspaceMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: _UserId })
  User: User;
}
