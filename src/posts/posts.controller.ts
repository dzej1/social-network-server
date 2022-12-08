import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostModel[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.get({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update({ where: { id }, data: updatePostDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove({ id });
  }
}
