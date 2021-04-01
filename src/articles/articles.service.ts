
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@app/auth/user.entity';

import { ArticleRepository } from './article.repository';
import { Article } from './article.entity';
import { UpdateArticleDto, GetArticlesDto, CreateArticleDto } from './dto';


@Injectable()
export class ArticlesService {
  
  constructor(
    @InjectRepository(ArticleRepository) private articleRepository: ArticleRepository
  ) { }
  
  getArticles(getArticlesDto: GetArticlesDto): Promise<Article[]> {
    return this.articleRepository.getArticles(getArticlesDto);
  }
  
  async getArticleById(id: number): Promise<Article> {
    const found = await this.articleRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Article with id:${id} was not found.`)
    }
    return found;
  }
  
  async createArticle(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
    return this.articleRepository.createArticle(createArticleDto, user);
  }
  
  async deleteArticle(id: number): Promise<Article> {
    let found = await this.getArticleById(id);
    this.articleRepository.remove(found);
    return found;
  }
  
  async updateArticle({key, value, id}: UpdateArticleDto): Promise<Article> {
    const articleToUpdate = await this.getArticleById(id);
    articleToUpdate[key] = value;
    await articleToUpdate.save();
    return articleToUpdate;
  }
  
}
