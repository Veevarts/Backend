import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ClientIdMiddleware implements NestMiddleware {
  use(req: Request | any, res: Response, next: NextFunction) {
    next();
  }
}