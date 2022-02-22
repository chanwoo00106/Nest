import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Author } from 'src/author/author.schema';
import { AuthorService } from 'src/author/author.service';
import { Book } from './book.schema';
import { BookService } from './book.service';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  @Query(() => [Book])
  async books() {
    return this.bookService.findMany();
  }

  @ResolveField(() => Author)
  async author(@Parent() book: Book) {
    return this.authorService.findById(book.author);
  }
}
