import { HttpResponseCodes } from '../../../../Contexts/Shared/domain/HttpResponse';
import { BaseMiddleware } from '../../../../Contexts/Shared/infrastructure/api/BaseMiddleware';
import { HttpRequest } from '../../../../Contexts/Shared/domain/HttpRequest';
import { NextFunction, Response } from 'express';

export default class CheckTokenHeaderMiddleware extends BaseMiddleware {
  async handle(request: HttpRequest, response: Response, next: NextFunction): Promise<void> {
    const userId = request.headers?.['token'] || request.headers?.['Token'];
    if (!userId) {
      return this.fail(response, {
        statusCode: HttpResponseCodes.unauthorized,
        name: 'INVALID_USERID',
      });
    }
    request.token = userId;
    this.success(next);
  }
}
