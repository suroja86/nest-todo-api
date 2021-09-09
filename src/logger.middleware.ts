import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const today = Date.now();
    console.log(`Request (test Middleware) ... ${today.toLocaleString()}`);
    next();
  }
}
