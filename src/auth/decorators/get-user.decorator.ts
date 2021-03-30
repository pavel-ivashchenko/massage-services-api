
import { createParamDecorator } from '@nestjs/common';


export const GetUser = createParamDecorator((data, req) => {
  console.log(req);
  return req.user;
})
