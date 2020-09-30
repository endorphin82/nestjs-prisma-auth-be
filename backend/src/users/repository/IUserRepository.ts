import { User } from '../domain/User';

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
}
