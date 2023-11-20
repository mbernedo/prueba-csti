import { FindCard } from "Contexts/card/card/application/find/FindCard";
import { mock } from "jest-mock-extended";
import { CardRepository } from "Contexts/card/card/domain/CardRepository";

describe('Find card data', async () => {
  const repository = mock<CardRepository>();
  const service = new FindCard(repository)
  test("Error por ser token invalido", () => {
    const tokenInvalid = 'token'
    expect(() => service.run(tokenInvalid)).toThrowError();
  });
  test("Token valido", () => {
    const tokenValid = 'pk_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYWFhYSIsImNhcmRfbnVtYmVyIjo0MTExMzEyMzEzMTIzMSwiY3Z2IjoyMjIsImV4cGlyYXRpb25fbW9udGgiOiIwOSIsImV4cGlyYXRpb25feWVhciI6IjIwMTMiLCJpYXQiOjE3MDA0NDkyODYsImV4cCI6MTcwMDQ0OTg4Nn0.dKwdZLk7fB0_TqXf3FjmwaeBRsPZneC4YRSdac7eOXU'
    expect(() => service.run(tokenValid)).not.toThrow();
  });
})