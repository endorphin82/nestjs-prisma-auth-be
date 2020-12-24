import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { TokenMap } from '../mappers/TokenMap';
import { Token } from '../domain/Token';
import { ITokenRepository } from './ITokenRepository';

@Injectable()
export class PrismaTokensRepository implements ITokenRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  async createToken(token: Token): Promise<Token> {
    const persistenceToken = TokenMap.toPersistence(token);
    const createdToken = await this.prisma.token.create({
      data: {
        ...persistenceToken,
      },
    });

    return TokenMap.toDomain(createdToken);
  }

  public async getAllTokens(): Promise<Token[]> {
    const tokens = await this.prisma.token.findMany();

    return tokens.map((token) => TokenMap.toDomain(token));
  }

  public async exists(uId: string, token: string): Promise<boolean> {

    const tokenWithIdOnly = await this.prisma.token.findMany({ select: { id: true } });
    return tokenWithIdOnly.includes({ id: uId });

  }

  // async getTokenByTitle(title: string): Promise<Token | null> {
  //   const token = await this.prisma.token.findOne({ where: { title } });
  //   if (!token) return null;
  //
  //   return TokenMap.toDomain(token);
  // }

  async getToken(id: string): Promise<Token> {
    const token = await this.prisma.token.findOne({ where: { id } });
    if (!token) return null;

    return TokenMap.toDomain(token);
  }
}

interface GetUsersArgs {
  name: string;
}
