
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesController } from './Articles.controller';
import { ArticlesService } from './Articles.service';
import { ArticleRepository } from './article.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository])
  ],
  controllers: [
    ArticlesController
  ],
  providers: [
    ArticlesService
  ]
})
export class ArticlesModule { }
