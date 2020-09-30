export interface IPassword {
  getHashedPassword(): Promise<string>;
  compare(password: string): Promise<boolean>;
}
