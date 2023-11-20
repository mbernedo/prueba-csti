import { ApplicationError } from '../../../../Shared/domain/ApplicationError';

export class InvalidToken extends ApplicationError {
  constructor() {
    super('Token inválido', 'INVALID_REQUEST');
  }
}
