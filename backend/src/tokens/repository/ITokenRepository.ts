import { Token } from '../domain/Token';

export interface ITokenRepository {
  getAllTokens(): Promise<Token[]>;
  getToken(id: string): Promise<Token>;
  // getProductByTitle(title: string): Promise<Product | null>;
  createToken(token: Token): Promise<Token>;
}
