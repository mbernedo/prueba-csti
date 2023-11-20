import { UseCaseResponse } from 'Contexts/Shared/domain/UseCaseResponse';
import { BaseUseCase } from '../../../../Shared/application/BaseUseCase';
import { CardRepository } from '../../domain/CardRepository';
import { verify } from 'jsonwebtoken'
import { InvalidToken } from '../../domain/errors/InvalidToken';
import Configuration from '../../../../../apps/card/backend/config';

interface Response {
  email: string;
  card_number: number;
  expiration_month: string;
  expiration_year: string;
}


export class FindCard extends BaseUseCase<string, Response> {
  constructor(private readonly repository: CardRepository) {
    super();
  }

  async run(token: string): Promise<UseCaseResponse> {
    const tokenToDecode = token.slice(3)
    try {
      const decode = verify(tokenToDecode, `${Configuration.JWT_KEY}`)
    } catch (err) {
      throw new InvalidToken()
    }
    const response = await this.repository.find(token)
    console.log(response)
    return { data: response }
  }
}
