import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): any => {
    const request: Request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
