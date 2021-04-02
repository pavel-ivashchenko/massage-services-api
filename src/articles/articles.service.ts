
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
  
  getArticles(getArticlesDto: GetArticlesDto, user: User): Promise<Article[]> {
    return this.articleRepository.getArticles(getArticlesDto, user);
  }
  
  async getArticleById(id: number, user: User): Promise<Article> {
    const found = await this.articleRepository.findOne({ where: { id, userId: user.id }});
    if (!found) {
      throw new NotFoundException(`Article with id:${id} was not found.`)
    }
    return found;
  }
  
  async createArticle(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
    return this.articleRepository.createArticle(createArticleDto, user);
  }
  
  async deleteArticle(id: number, user: User): Promise<void> {
    const result = await this.articleRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
  }
  
  async updateArticle({key, value, id}: UpdateArticleDto, user: User): Promise<Article> {
    const articleToUpdate = await this.getArticleById(id, user);
    articleToUpdate[key] = value;
    await articleToUpdate.save();
    return articleToUpdate;
  }
  
}
