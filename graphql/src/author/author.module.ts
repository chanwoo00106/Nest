import { Module } from '@nestjs/common';
import { AuthorResolver } from './author.resolver';

@Module({
  providers: [AuthorResolver]
})
export class AuthorModule {}
