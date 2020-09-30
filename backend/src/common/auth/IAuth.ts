export interface IAuth<T> {
  getUser(token: string): Promise<string>;
  getToken(user: T): string;
}
