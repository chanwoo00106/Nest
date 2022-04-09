import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { File } from './files';

@Entity()
export class Users {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @OneToMany(() => File, (file) => file.user)
  @Column({ nullable: true })
  files: File[];
}
