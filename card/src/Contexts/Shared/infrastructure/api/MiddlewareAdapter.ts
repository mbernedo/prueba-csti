import { NextFunction, Response } from 'express';
import { HttpRequest } from 'Contexts/Shared/domain/HttpRequest';
import { BaseMiddleware } from './BaseMiddleware';

export class MiddlewareAdapter {
  static handle(middleware: BaseMiddleware) {
    return async (httpRequest: HttpRequest, response: Response, next: NextFunction): Promise<void> => {
      await middleware.execute(httpRequest, response, next);
    };
  }

  // static handle(
  //   middleware: BaseMiddleware,
  // ): (httpRequest: HttpRequest, response: Response, next: NextFunction) => Promise<void> {
  //   return async (httpRequest: HttpRequest, response: Response, next: NextFunction): Promise<void> => {
  //     await middleware.execute(httpRequest, response, next);
  //   };
  // }
}
