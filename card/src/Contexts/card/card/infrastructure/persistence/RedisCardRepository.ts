import { RedisRepository } from '../../../../Shared/infrastructure/persistence/redis/RedisRepository';
import { Card } from '../../domain/Card';
import { CardRepository } from '../../domain/CardRepository';

export class RedisCardRepository extends RedisRepository implements CardRepository {
  async find(token: string): Promise<Card> {
    const client = await this.connect();
    const response = await client.get(token);
    const jsonResponse = JSON.parse(response)
    delete jsonResponse.cvv
    return jsonResponse && Card.fromPrimitive(jsonResponse);
  }
}
