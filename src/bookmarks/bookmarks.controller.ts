import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmark.model';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';
import { url } from 'inspector';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  // @Get()
  // findAll() : Bookmark []{
  //  return this.bookmarksService.findAll();
  // }

  @Get()
  find(@Query() getBookmarkDto: GetBookmarkDto): Bookmark[] {
    // if (Object.keys(getBookmarkDto).length) {
    //   return this.bookmarksService.find(getBookmarkDto);
    // }
    // return this.bookmarksService.findAll();
    // }
    return this.bookmarksService.find(getBookmarkDto);
  }

  @Get('/:id')
  findID(@Param('id') id: string): Bookmark | undefined {
    return this.bookmarksService.findById(id);
  }

  @Post()
  createBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Bookmark | undefined {
    return this.bookmarksService.createBookmark(createBookmarkDto);
  }

  @Delete('/:id')
  deleteBookmark(@Param('id') id: string): void {
    this.bookmarksService.deleteBookmark(id);
  }

  @Patch('/:id/description')
  // http://localhost:3000/bookmarks/:id/description
  // http://127.0.0.1:3000/bookmarks/ca8dfeab-d826-45c1-9b15-291e77e81984/description
  updateBookmarkDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ): Bookmark | undefined {
    return this.bookmarksService.updateBookmarkDescription(id, description);
  }
}
