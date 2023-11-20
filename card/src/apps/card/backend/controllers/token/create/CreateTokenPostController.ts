import { Response } from 'express';
import { BaseController } from '../../../../../../Contexts/Shared/infrastructure/api/BaseController';
import { CreateToken } from '../../../../../../Contexts/card/token/application/create/CreateToken';
import { HttpRequest } from '../../../../../../Contexts/Shared/domain/HttpRequest';
import { ApplicationError } from 'Contexts/Shared/domain/ApplicationError';

export class CreateTokenPostController extends BaseController {
  constructor(private readonly service: CreateToken) {
    super();
  }
  async handle(httpRequest: HttpRequest, httpResponse: Response): Promise<void> {
    try {
      const response = await this.service.run({ ...httpRequest.body });
      this.ok(httpResponse, response);
    } catch (error) {
      this.fail(httpResponse, error as ApplicationError);
    }
  }
}
