
import { EntityRepository, Repository } from 'typeorm';

import { Article } from './article.entity';
import { CreateArticleDto, GetArticlesDto } from './dto';


@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  
  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    let article = new Article();
    Object.keys(createArticleDto).forEach(key => article[key] = createArticleDto[key]);
    await article.save();
    return article;
  }
  
  async getArticles({searchKey, value}: GetArticlesDto): Promise<Article[]> {
    const query = this.createQueryBuilder('article');
    
    if (searchKey && value) {
      query.andWhere(`article.${searchKey} = :${searchKey}`, { [searchKey]: value });
    }
    
    return await query.getMany();
  }

}
