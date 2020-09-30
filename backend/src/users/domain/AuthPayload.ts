import { User } from './User';

export type AuthPayload = {
  user: User;
  token: string;
};
