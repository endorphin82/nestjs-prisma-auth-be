import { User } from '../domain/User';
import { AuthPayload } from '../domain/AuthPayload';

export interface IUserService {
  signUpUser(data: SignUpUserInterface): Promise<AuthPayload>;
  signInUser(data: SignInUserInterface): Promise<AuthPayload>;
  createUser(data: CreateUserInterface): Promise<User>;
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
}

export interface CreateUserInterface {
  email: string
  role: string
  firstName?: string | null
  lastName?: string | null
  status: string
  password: string;
}

export interface SignUpUserInterface {
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface SignInUserInterface {
  email: string;
  password: string;
}
