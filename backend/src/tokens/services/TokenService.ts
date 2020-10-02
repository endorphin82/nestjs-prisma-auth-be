import { Inject, Injectable } from '@nestjs/common';

import { CreateTokenInterface, ITokenService } from './ITokenService';
import { Token } from '../domain/Token';
import { ITokenRepository } from '../repository/ITokenRepository';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    @Inject('ITokenRepository') private readonly tokenRepository: ITokenRepository,
  ) {
  }

  getToken(id: string): Promise<Token> {
    return this.tokenRepository.getToken(id);
  }

  public async createToken({ expireAt, userId, token }: CreateTokenInterface): Promise<any> {

    console.log('{ expireAt, userId, token }', { expireAt, userId, token });

    const tok = Token.create({ expireAt, userId, token });

    return await this.tokenRepository.createToken(tok);

  }

  public async getTokens(): Promise<Token[]> {
    return this.tokenRepository.getAllTokens();
  }
}
