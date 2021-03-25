
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesModule } from './articles/articles.module';
import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [
    ArticlesModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ]
})
export class AppModule { }
