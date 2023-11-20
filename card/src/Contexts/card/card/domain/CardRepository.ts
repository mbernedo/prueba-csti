import { Card } from "./Card";

export interface CardRepository {
  find(token: string): Promise<Card>
}
