import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { BookService } from 'src/book/book.service';
import { Author } from './author.schema';
import { AuthorService } from './author.service';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
  ) {}

  @Query(() => [Author])
  async author() {
    return this.authorService.findMany();
  }

  @ResolveField()
  async books(@Parent() author: Author) {
    return this.bookService.findByAuthorId(author.id);
  }
}
