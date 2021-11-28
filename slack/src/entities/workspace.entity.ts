import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { Dm } from './dm.entity';
import { Mention } from './mention.entity';
import { WorkspaceMember } from './workspace.member.entity';
import { User } from './user.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 30 })
  name: string;

  @Column('varchar', { unique: true, length: 30 })
  url: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Channel, (channel) => channel.Workspace)
  Channels: Channel[];

  @OneToMany(() => Dm, (dm) => dm.Workspace)
  DMs: Dm[];

  @Column('int', { name: 'owner_id', nullable: true })
  OwnerId: number | null;

  @OneToMany(() => Mention, (mention) => mention.Workspace)
  Mentions: Mention[];

  @OneToMany(
    () => WorkspaceMember,
    (workspaceMember) => workspaceMember.Workspace,
  )
  WorkspaceMembers: WorkspaceMember[];

  @ManyToOne(() => User, (user) => user.OwnedWorkspaces, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  Owner: User;

  @ManyToMany(() => User, (user) => user.Workspaces)
  Members: User[];
}
