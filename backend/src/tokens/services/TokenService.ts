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

  public createToken(data: CreateTokenInterface) {
    const token = Token.create(data);

    return this.tokenRepository.createToken(token);
  }

  public async getTokens(): Promise<Token[]> {
    return this.tokenRepository.getAllTokens();
  }
}
