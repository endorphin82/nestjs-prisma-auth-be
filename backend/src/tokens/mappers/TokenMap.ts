import { Token as PersistenceToken } from '@prisma/client';

import { UniqueEntityID } from '../../common/UniqueEntityID';
import { Token } from '../domain/Token';
import { NexusGenFieldTypes } from '../../generated/nexus';

export class TokenMap {
  static toDomain(raw: PersistenceToken): Token {
    const token = Token.create(
      {
        token: raw.token,
        userId: raw.userId,
        expireAt: raw.expireAt,
      },
      new UniqueEntityID(raw.id),
    );

    return token;
  }

  static toPersistence(token: Token): PersistenceToken {
    return {
      id: token.id.toValue(),
      token: token.token,
      userId: token.userId,
      expireAt: token.expireAt,
    };
  }

  static toNexus(token: Token): NexusGenFieldTypes['Token'] {
    console.log('token', token);
    return {
      id: token.id.toValue(),
      token: token.token,
      expireAt: token.expireAt,
      uId: null as any
      // category: NexusGenFieldTypes['Category'] | null;
    };
  }
}
