
import { Module } from '@nestjs/common';
import { ArticlesController } from './Articles.controller';
import { ArticlesService } from './Articles.service';


@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule { }
