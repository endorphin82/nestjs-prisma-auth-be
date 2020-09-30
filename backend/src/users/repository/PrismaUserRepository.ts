import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { IUserRepository } from './IUserRepository';
import { UserMap } from '../mappers/UserMap';
import { User } from '../domain/User';

@Injectable()
export class PrismaUsersRepository implements IUserRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createUser(user: User): Promise<User> {
    const persistenceUser = UserMap.toPersistence(user);
    const createdUser = await this.prisma.user.create({
      data: {
        ...persistenceUser,
        role: { set: persistenceUser.role },
      },
    });

    return UserMap.toDomain(createdUser);
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => UserMap.toDomain(user));
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findOne({ where: { email } });
    if (!user) return null;

    return UserMap.toDomain(user);
  }

  async getUser(id: string): Promise<User> {
    const user = await this.prisma.user.findOne({ where: { id } });
    if (!user) return null;

    return UserMap.toDomain(user);
  }
}

interface GetUsersArgs {
  name: string;
}
