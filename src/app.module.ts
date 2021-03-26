
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticlesModule } from './articles/articles.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ArticlesModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule
  ]
})
export class AppModule { }
