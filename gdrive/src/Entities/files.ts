import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from './users';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ unique: true })
  name: string;

  @Column()
  VersionId: string;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => Users, (user) => user.files)
  user: Users;
}
