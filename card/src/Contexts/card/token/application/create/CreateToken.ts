import { UseCaseResponse } from 'Contexts/Shared/domain/UseCaseResponse';
import { BaseUseCase } from '../../../../Shared/application/BaseUseCase';
import { TokenRepository } from '../../domain/TokenRepository';
import { InvalidRequest } from '../../domain/errors/InvalidRequest';
import { sign } from 'jsonwebtoken'
import Configuration from '../../../../../apps/card/backend/config';

interface Request {
  email: string;
  card_number: number;
  cvv: number;
  expiration_month: string;
  expiration_year: string;
}


export class CreateToken extends BaseUseCase<Request, any> {
  constructor(private readonly repository: TokenRepository) {
    super();
  }

  async run(request: Request): Promise<UseCaseResponse> {
    const validRequest = this.validateLength(request)
    if (!validRequest) throw new InvalidRequest()
    const validFields = this.validateFields(request)
    if (!validFields) throw new InvalidRequest()
    const token = sign(request, `${Configuration.JWT_KEY}`, { expiresIn: "1m" })
    const tokenToUse = `pk_${token}`
    await this.repository.save(tokenToUse, JSON.stringify(request))
    return {
      data: {
        token: tokenToUse
      }
    }
  }

  private validateLength(request: Record<string, any>): boolean {
    if (request.card_number.toString().length < 13 || request.card_number.toString().length > 16) {
      return false;
    }
    if (request.cvv.toString().length < 3 || request.cvv.toString().length > 4) {
      return false;
    }
    if (request.expiration_month.length > 2) {
      return false;
    }
    if (request.expiration_year.length > 4) {
      return false;
    }
    if (request.email.length < 5 || request.email.length > 100) {
      return false;
    }
    return true;
  }

  private validateFields(request: Record<string, any>): boolean {
    if (!this.validCardNumber(request.card_number)) return false;
    if (!this.isValidEmail(request.email)) return false;
    if (!this.validMonth(request.expiration_month)) return false;
    if (!this.validYear(request.expiration_year)) return false;
    return true;
  }

  private validCardNumber(card_number: number): boolean {
    const digits = card_number.toString().split('').map(Number).reverse();
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  private validMonth(expiration_month: string): boolean {
    const monthNumber = Number(expiration_month);
    return !isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12;
  }

  private validYear(expiration_year: string): boolean {
    const currentYear = new Date().getFullYear();
    const inputYear = Number(expiration_year);
    return !isNaN(inputYear) && inputYear >= currentYear && inputYear <= currentYear + 5;
  }

  private isValidEmail(email: string): boolean {
    var emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.es)$/;
    return emailRegex.test(email);
  }
}