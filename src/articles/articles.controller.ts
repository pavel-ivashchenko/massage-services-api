
import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser, PlainBody } from '@app/shared/decorators';
import { User } from '@app/auth/user.entity';

import { ArticlesService } from './articles.service';
import { UpdateArticleDto, GetArticlesDto, CreateArticleDto } from './dto';
import { ArticleValidationPipe } from './pipes/article-validation.pipe';
import { Article } from './article.entity';


@Controller('articles')
@UseGuards(AuthGuard('jwt'))
export class ArticlesController {
  
  constructor(private articlesService: ArticlesService) { }
  
  @Get('/:id')
  getArticleById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articlesService.getArticleById(id);
  }
  
  @Get()
  getArticles(@Query(ValidationPipe) filterDto: GetArticlesDto): Promise<Article[]> {
    return this.articlesService.getArticles(filterDto);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  createArticle(
    @PlainBody(ArticleValidationPipe) body: CreateArticleDto,
    @GetUser() user: User
  ): Promise<Article> {
    return this.articlesService.createArticle(body, user);
  }
  
  @Patch()
  updateArticle(@PlainBody(ArticleValidationPipe) body: UpdateArticleDto): Promise<Article> {
    return this.articlesService.updateArticle(body);
  }
  
  @Delete('/:id')
  deleteArticle(@Param('id') id: number): Promise<Article> {
    return this.articlesService.deleteArticle(id);
  }
  
}
