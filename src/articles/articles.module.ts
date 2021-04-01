
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@app/auth/auth.module';

import { ArticlesController } from './Articles.controller';
import { ArticlesService } from './Articles.service';
import { ArticleRepository } from './article.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository]),
    AuthModule
  ],
  controllers: [
    ArticlesController
  ],
  providers: [
    ArticlesService
  ]
})
export class ArticlesModule { }
