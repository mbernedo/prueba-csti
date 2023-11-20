import { createClient } from 'redis'

export abstract class RedisRepository {

  protected async connect(): Promise<any> {
    const client = createClient()
    client.on('error', (err) => console.log("Redis cliente error", err));
    await client.connect();
    return client;
  }
}
