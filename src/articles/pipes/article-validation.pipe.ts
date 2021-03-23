
import { ArgumentMetadata, PipeTransform } from "@nestjs/common";


export class ArticleCreateValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('HERE WILL BE VALIDATION');
    
    return value;
  }
}
