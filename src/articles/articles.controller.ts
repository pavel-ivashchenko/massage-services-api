
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { IArticle } from './articles.model';
import { ArticlesService } from './articles.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticlesFilterDto } from './dto/get-articles-fitler.dto';
import { ArticleCreateValidationPipe } from './pipes/article-validation.pipe';


@Controller('articles')
export class ArticlesController {
  
  constructor(private articlesService: ArticlesService) { }
  
  @Get()
  getArticles(@Query(ValidationPipe) filterDto: GetArticlesFilterDto): IArticle[] {
    return Object.keys(filterDto).length ?
      this.articlesService.getArticlesWithFilters(filterDto) :
      this.articlesService.getAllArticles();
  }
  
  @Get('/:id')
  getArticleById(@Param('id') id: string): IArticle {
    return this.articlesService.getArticleById(id);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  createArticle(@Body(ArticleCreateValidationPipe) body: Omit<CreateArticleDto, 'id'>): IArticle {
    return this.articlesService.createArticle(body);
  }
  
  @Patch()
  updateArticle(@Body() body: {id: string, key: keyof Omit<CreateArticleDto, 'id'>, value: any}) {
    return this.articlesService.updateArticle(body);
  }
  
  @Delete('/:id')
  deleteArticle(@Param('id') id: string): IArticle {
    return this.articlesService.deleteArticle(id);
  }
  
}
