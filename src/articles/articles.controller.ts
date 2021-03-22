
import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { IArticle } from './articles.model';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';


@Controller('articles')
export class ArticlesController {
  
  constructor(private articlesService: ArticlesService) { }
  
  @Get()
  getAllArticles(): IArticle[] {
    return this.articlesService.getAllArticles();
  }
  
  @Get('/:id')
  getArticleById(@Param() id: string): IArticle {
    return this.articlesService.getArticleById(id);
  }
  
  @Post()
  createArticle(@Body() createArticleDto: Omit<CreateArticleDto, 'id'>): IArticle {
    return this.articlesService.createArticle(createArticleDto);
  }
  
  @Delete()
  deleteArticle(@Param() id: string): IArticle {
    return this.articlesService.deleteArticle(id);
  }
  
}
