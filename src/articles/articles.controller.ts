
import { Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
  private logger = new Logger('ArticlesController');
  
  constructor(private articlesService: ArticlesService) { }
  
  @Get('/:id')
  getArticleById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Article> {
    return this.articlesService.getArticleById(id, user);
  }
  
  @Get()
  getArticles(
    @Query(ValidationPipe) filterDto: GetArticlesDto,
    @GetUser() user: User
  ): Promise<Article[]> {
    this.logger.verbose(`User ${user.userName} retrieving all articles. Filters: ${JSON.stringify(filterDto)}`);
    return this.articlesService.getArticles(filterDto, user);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  createArticle(
    @PlainBody(ArticleValidationPipe) body: CreateArticleDto,
    @GetUser() user: User
  ): Promise<Article> {
    this.logger.verbose(`User ${user.userName} creating an article. Body: ${JSON.stringify(body)}`);
    return this.articlesService.createArticle(body, user);
  }
  
  @Patch()
  updateArticle(
    @PlainBody(ArticleValidationPipe) body: UpdateArticleDto,
    @GetUser() user: User
  ): Promise<Article> {
    return this.articlesService.updateArticle(body, user);
  }
  
  @Delete('/:id')
  deleteArticle(@Param('id') id: number, user: User): Promise<void> {
    return this.articlesService.deleteArticle(id, user);
  }
  
}
