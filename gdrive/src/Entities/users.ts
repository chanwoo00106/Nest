import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { File } from './files';

@Entity()
export class Users {
  @PrimaryColumn({ type: 'varchar', nullable: false })
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  refresh: string;

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
