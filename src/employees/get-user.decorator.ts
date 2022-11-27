import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { employees } from './employees.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): employees => {
    const req = ctx.switchToHttp().getRequest();
    return req.employees_id;
  },
);