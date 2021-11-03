import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import key from 'key';

@Module({
  imports: [BlogModule, MongooseModule.forRoot(key.key)],
  controllers: [AppController],
})
export class AppModule {}
