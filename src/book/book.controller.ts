import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  create(
    @UploadedFile() file?: Express.Multer.File,
    @Body() body?: any, // Use `any` because FormData cannot be mapped to DTO automatically
  ) {
    const data: CreateBookDto = {
      title: body.title,
      authorId: Number(body.authorId),
      image: file?.filename,
    };
    return this.bookService.create(data);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file?: Express.Multer.File,
    @Body() body?: any,
  ) {
    const data: Partial<CreateBookDto> = {
      title: body.title,
      authorId: body.authorId ? Number(body.authorId) : undefined,
      image: file?.filename,
    };
    return this.bookService.update(id, data);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }
}
