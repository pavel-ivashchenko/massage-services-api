
import { User } from '@app/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';

import { Article } from './article.entity';
import { CreateArticleDto, GetArticlesDto } from './dto';


@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  
  async createArticle(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
    let article = new Article();
    Object.keys(createArticleDto).forEach(key => article[key] = createArticleDto[key]);
    article.user = user;
    await article.save();
    delete article.user;
    return article;
  }
  
  async getArticles({searchKey, value}: GetArticlesDto, user: User): Promise<Article[]> {
    const query = this.createQueryBuilder('article');
    
    query.where(`article.userId = :userId`, { userId: user.id });
    
    if (searchKey && value) {
      query.andWhere(`article.${searchKey} = :${searchKey}`, { [searchKey]: value });
    }
    
    return await query.getMany();
  }

}
