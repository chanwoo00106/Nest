import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './Entity/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'nestjs',
      entities: [TodoEntity],
      synchronize: true,
    }),
    TodoModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
