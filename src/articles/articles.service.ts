
import { Injectable } from '@nestjs/common';
import * as uniqid from 'uniqid';

import { IArticle } from './articles.model';
import { CreateArticleDto } from './dto/create-article.dto';


@Injectable()
export class ArticlesService {
  
  private articles: IArticle[] = [];
  
  getAllArticles(): IArticle[] {
    return this.articles;
  }
  
  getArticleById(id: string): IArticle {
    return this.articles.find(article => article.id === id);
  }
  
  createArticle(createArticleDto: Omit<CreateArticleDto, 'id'>): IArticle {
    const newArticle = { ...createArticleDto, id: uniqid() };
    this.articles.push(newArticle);
    return newArticle;
  }
  
  deleteArticle(id: string): IArticle {
    let deletedArticle;
    this.articles = this.articles.filter(article => {
      if (article.id === id) {
        deletedArticle = article;
        return false;
      }
      return true;
    });
    return deletedArticle;
  }
  
}
