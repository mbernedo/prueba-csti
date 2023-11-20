import { ApplicationError } from '../../../../Shared/domain/ApplicationError';

export class InvalidRequest extends ApplicationError {
  constructor() {
    super('Request inválido', 'INVALID_REQUEST');
  }
}
