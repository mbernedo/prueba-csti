export interface TokenBody {
  readonly id?: string | undefined;
  cardId: string;
  token: string;
  ttl: number;
  created: Date
}

export class Token {
  private readonly id?: string | undefined;
  private cardId: string;
  private token: string;
  private ttl: number;
  private created: Date;

  private constructor(data: TokenBody) {
    this.id = data.id;
    this.cardId = data.cardId;
    this.token = data.token;
    this.ttl = data.ttl;
    this.created = data.created;
  }

  public static create(id: string, cardId: string, token: string): Token {
    return new Token({
      id,
      cardId,
      token,
      ttl: 60,
      created: new Date()
    })
  }

  static fromPrimitive(data: any): Token {
    return new Token({
      id: data._id,
      ...data
    });
  }

  public static toPrimitive(data: Token): any {
    return {
      id: data.id,
      ...data
    };
  }
}
