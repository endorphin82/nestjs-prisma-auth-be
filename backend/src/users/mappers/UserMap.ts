import { User as PersistenceUser } from '@prisma/client';

import { NexusGenFieldTypes } from '../../generated/nexus';
import { UniqueEntityID } from '../../common/UniqueEntityID';

import { User } from '../domain/User';

export class UserMap {
  static toDomain(raw: PersistenceUser): User {
    const user = User.create(
      {
        email: raw.email,
        role: raw.role,
        firstName: raw.firstName,
        lastName: raw.lastName,
        password: raw.password,
        status: raw.status,
      },
      new UniqueEntityID(raw.id),
    );

    return user;
  }

  static toPersistence(user: User): PersistenceUser {
    return {
      id: user.id.toValue(),
      email: user.email!,
      role: user.role!,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      status: user.status!,
    };
  }

  static toNexus(user: User): NexusGenFieldTypes['User'] {
    return {
      id: user.id.toValue(),
      email: user.email,
      role: user.role!,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      status: user.status!,
      tokens: [] as any,
      // accounts: null,
    };
  }
}
