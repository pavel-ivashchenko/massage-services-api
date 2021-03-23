
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';


export class GetArticlesFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: keyof CreateArticleDto;

  @IsOptional()
  value: any;
}
