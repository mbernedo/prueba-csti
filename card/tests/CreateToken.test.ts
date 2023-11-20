import { mock } from "jest-mock-extended";
import { CreateToken } from "../src/Contexts/card/token/application/create/CreateToken";
import { TokenRepository } from "../src/Contexts/card/token/domain/TokenRepository";

describe('Validations', async () => {
  const repository = mock<TokenRepository>();
  const service = new CreateToken(repository)
  test("Error cvv", () => {
    const cardData = {
      card_number: 1234567812345670,
      expiration_month: "12",
      expiration_year: "2024",
      cvv: 12345,
      email: "test@gmail.com",
    };

    expect(() => service.run(cardData)).toThrowError(
      "El campo cvv debe tener 3 o 4 dígitos."
    );
  });
  test("Error email", () => {
    const cardData = {
      card_number: 1234567812345670,
      expiration_month: "12",
      expiration_year: "2025",
      cvv: 12,
      email: "invalidemail@example.com",
    };
    expect(() => service.run(cardData)).toThrowError(
      'El campo email debe tener entre 5 y 100 caracteres y ser un email válido con los dominios "gmail.com", "hotmail.com" o "yahoo.es".'
    );
  });
  test("Correct request", () => {
    const validCardData = {
      card_number: 1234567812345670,
      expiration_month: "12",
      expiration_year: "2025",
      cvv: 123,
      email: "test@gmail.com",
    };
    expect(() => service.run(validCardData)).not.toThrow();
  });
})