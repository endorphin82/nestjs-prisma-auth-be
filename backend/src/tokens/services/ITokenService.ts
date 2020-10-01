import { Token } from '../domain/Token';

export interface ITokenService {
  createToken(data: CreateTokenInterface): Promise<Token>;
  getTokens(): Promise<Token[]>;
  getToken(id: string): Promise<Token>;
}

export interface CreateTokenInterface {
  token: string;
  userId: string;
  expireAt: string;
}
