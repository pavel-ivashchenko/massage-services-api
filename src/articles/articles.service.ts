
import { Injectable, NotFoundException } from '@nestjs/common';
import * as uniqid from 'uniqid';

import { IArticle } from './articles.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticlesFilterDto } from './dto/get-articles-fitler.dto';


@Injectable()
export class ArticlesService {
  
  private articles: IArticle[] = [];
  
  getAllArticles(): IArticle[] {
    return this.articles;
  }
  
  getArticlesWithFilters({search, value}: GetArticlesFilterDto): IArticle[] {
    const articles = this.getAllArticles();
    return articles && search ?
      articles.filter(article => Object.keys(article).some(key => key === search && article[key] === value)) : [];
  }
  
  getArticleById(id: string): IArticle {
    const found = this.articles.find(article => article.id === id);
    if (!found) {
      throw new NotFoundException(`Article with id:${id} was not found.`)
    }
    return found;
  }
  
  createArticle(createArticleDto: Omit<CreateArticleDto, 'id'>): IArticle {
    const newArticle = { ...createArticleDto, id: uniqid() };
    this.articles.push(newArticle);
    return newArticle;
  }
  
  deleteArticle(id: string): IArticle {
    let found = this.getArticleById(id);
    this.articles = this.articles.filter(article => article.id !== found?.id);
    return found;
  }
  
  updateArticle({key, value, id}: {key: string; value: any; id: string}): IArticle {
    const updatedArticle = this.getArticleById(id);
    if (updatedArticle) {
      updatedArticle[key] = value;
    }
    return updatedArticle;
  }
  
}
