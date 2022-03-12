import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request: Request = context.switchToHttp().getRequest();
    console.log(request.user);
    console.log(request.body);
    return request.user['sub'];
  },
);
