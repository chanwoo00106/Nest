import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [BlogModule],
  controllers: [AppController],
})
export class AppModule {}
