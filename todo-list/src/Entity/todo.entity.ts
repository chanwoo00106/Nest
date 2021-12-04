import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todo: string;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  end_date: Date;

  @Column()
  toggle: boolean;
}
