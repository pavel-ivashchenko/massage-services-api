
import { BadRequestException, PipeTransform } from '@nestjs/common';


export class ArticleValidationPipe implements PipeTransform {
  transform(value) {

    if (typeof value !== 'object' || value === null) {
      throw new BadRequestException('Value is not of Object type.');
    }
    
    if (Object.keys(value).some(key => this.isEmpty(value[key]))) {
      throw new BadRequestException('Value must not contain empty properties.');
    }
    
    return value;
  }
  
  private isEmpty(value: unknown): boolean {
    return value === null || value === undefined || value === '';
  }
}
