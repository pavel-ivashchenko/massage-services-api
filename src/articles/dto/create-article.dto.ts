
import { IsNotEmpty } from 'class-validator';


export class CreateArticleDto {
  @IsNotEmpty() title: string;
  @IsNotEmpty() day: number;
  @IsNotEmpty() month: string;
  @IsNotEmpty() title_img: string;
  @IsNotEmpty() author_img: string;
  @IsNotEmpty() author_name: string;
  @IsNotEmpty() content: string;
  @IsNotEmpty() intro: string;
  @IsNotEmpty() clipboard_link: string;
  
  id: string;
  bg_title_1: string;
  bg_title_2: string;
  watched_times: number;
  hearts: number;
}
