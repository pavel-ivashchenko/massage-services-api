
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';

import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ArticlesModule,
    AuthModule
  ]
})
export class AppModule { }
