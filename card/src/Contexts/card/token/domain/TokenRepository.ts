export interface TokenRepository {
  save(key: string, data: string): Promise<void>
}
