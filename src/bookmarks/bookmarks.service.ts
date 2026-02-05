import { Injectable } from '@nestjs/common';
import { Bookmark } from './bookmark.model';
import { v4 as uuid } from 'uuid';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Injectable()
export class BookmarksService {
  private bookmarks: Bookmark[] = [
    {
      id: uuid(),
      description: 'NestJS Documentation',
      url: 'https://docs.nestjs.com/',
    },
  ];

  findById(id: string): Bookmark | undefined {
    return this.bookmarks.find((bookmark) => bookmark.id == id);
  }

  findAll(): Bookmark[] {
    return this.bookmarks;
  }

  find(getBookmarkDto: GetBookmarkDto): Bookmark[] {
    let bookmarks = this.findAll();
    const { url, description } = getBookmarkDto;

    if (url) {
      // include implement search
      // filter implement return Bookmark[]

      bookmarks = bookmarks.filter((bookmark) =>
        bookmark.url.toLowerCase().includes(url),
      );

      //   bookmarks = bookmarks.filter((bookmark) =>
      //     bookmark.url == url,
      //   );
    }

    if (description) {
      bookmarks = bookmarks.filter((bookmark) =>
        bookmark.description.toLowerCase().includes(description),
      );
    }

    return bookmarks;
  }

  createBookmark(createBookmarkDto: CreateBookmarkDto): Bookmark {
    const { url, description } = createBookmarkDto;

    const bookmark: Bookmark = {
      id: uuid(),
      url,
      description,
    };

    this.bookmarks.push(bookmark);
    return bookmark; // try to return the created object ( best practice )
  }

  deleteBookmark(id: string): void {
    this.bookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== id);
  }

  updateBookmarkDescription(
    id: string,
    description: string,
  ): Bookmark | undefined {
    const bookmark = this.findById(id);
    if (bookmark) {
      bookmark.description = description;
    }
    return bookmark;
  }
}
