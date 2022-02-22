import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';

@Module({
  imports: [AuthorModule, BookModule],
  controllers: [],
  providers: [BookService],
})
export class AppModule {}
