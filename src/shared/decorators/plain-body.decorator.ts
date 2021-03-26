
import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import * as rawBody from 'raw-body';


export const PlainBody = createParamDecorator(async (_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest<import('express').Request>();
  
  if (!req.readable) {
    throw new BadRequestException('Invalid body.');
  }

  const stringBody = (await rawBody(req)).toString('utf8').trim();
  
  try {
    const body = JSON.parse(stringBody);
    return body;
  } catch(error) {
    throw new BadRequestException('Invalid body.');
  }
})
