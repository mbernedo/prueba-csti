import { RedisRepository } from '../../../../Shared/infrastructure/persistence/redis/RedisRepository';
import { TokenRepository } from '../../domain/TokenRepository';

export class RedisTokenRepository extends RedisRepository implements TokenRepository {
  protected DB_NAME = 'card';
  protected COLLECTION_NAME = 'token';

  async save(key: string, data: string): Promise<void> {
    const client = await this.connect();
    try {
      client.set(key, data)
    } catch (error) {
      console.log(error);
    }
  }
}
