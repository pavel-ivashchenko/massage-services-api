
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';


export class GetArticlesDto {
  @IsNotEmpty()
  searchKey: keyof CreateArticleDto;

  @IsOptional()
  value: any;
}
