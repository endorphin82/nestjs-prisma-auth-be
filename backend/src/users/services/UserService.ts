import { Inject, Injectable } from '@nestjs/common';
import { Email } from '../../common/Email';
import { IPassword } from '../../common/auth/IPassword';
import { BcryptPassword } from '../../common/auth/BcryptPassword';

import { IUserService, CreateUserInterface, SignUpUserInterface, SignInUserInterface } from './IUserService';
import { IUserRepository } from '../repository/IUserRepository';
import { User } from '../domain/User';
import { AuthPayload } from '../domain/AuthPayload';
import { JWT } from '../../common/auth/JWT';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {
  }

  getUser(id: string): Promise<User> {
    const user = this.userRepository.getUser(id);

    return user;
  }

  async signInUser({ email, password }: SignInUserInterface): Promise<AuthPayload> {
    const userEmail = Email.create({ email });
    userEmail.validate();

    const userExists = await this.userRepository.getUserByEmail(userEmail.email);
    if (!userExists || !userExists.password) throw new Error('Incorrect email or password');

    const bcryptPassword: IPassword = BcryptPassword.create({ password });
    const passwordMatch = bcryptPassword.compare(userExists.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email or password');
    }

    const user = User.create(userExists, userExists.id);

    const jwt:JWT = new JWT();
    const token = jwt.getToken(user);

    return {
      token,
      user: userExists,
    };
  }

  public createUser({ email, password, firstName, lastName, middleName, role }: CreateUserInterface) {
    const user = User.create({ email, password, firstName, lastName, middleName, role });

    return this.userRepository.createUser(user);
  }

  public async getUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  public async signUpUser({ email, firstName, lastName, password }: SignUpUserInterface): Promise<AuthPayload> {
    const userEmail = Email.create({ email });
    userEmail.validate();

    const userExists = await this.userRepository.getUserByEmail(userEmail.email);
    if (userExists) throw new Error('This email is already exist in our system');

    const bcryptPassword: IPassword = BcryptPassword.create({ password });
    const hashedPassword: string = await bcryptPassword.getHashedPassword();

    const user = User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email: userEmail.email,
      role: 'EMPLOYEE',
    });

    const createdUser = await this.userRepository.createUser(user);

    const jwt: JWT = new JWT();
    const token = jwt.getToken(user);

    return {
      token,
      user: createdUser,
    };
  }
}
