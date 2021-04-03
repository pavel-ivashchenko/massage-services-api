
import { User } from '@app/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Article } from './article.entity';
import { CreateArticleDto, GetArticlesDto } from './dto';


@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  
  private logger = new Logger('ArticleRepository');
  
  async createArticle(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
    let article = new Article();
    Object.keys(createArticleDto).forEach(key => article[key] = createArticleDto[key]);
    article.user = user;
    
    try {
      await article.save();
      delete article.user;
      return article;
    } catch(error) {
      this.logger.error(`Failed to create article for a user "${user.userName}". DTO: ${JSON.stringify(createArticleDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
  
  async getArticles({searchKey, value}: GetArticlesDto, user: User): Promise<Article[]> {
    const query = this.createQueryBuilder('article');
    
    query.where(`article.userId = :userId`, { userId: user.id });
    
    if (searchKey && value) {
      query.andWhere(`article.${searchKey} = :${searchKey}`, { [searchKey]: value });
    }
    
    try {
      const articles = await query.getMany();
      return articles;
    } catch(error) {
      this.logger.error(`Failed to get articles for user "${user.userName}" with searchKey: ${searchKey} and value: ${value}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

}
