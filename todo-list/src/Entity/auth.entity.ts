import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;
}
