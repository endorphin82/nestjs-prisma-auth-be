import { User as PersistenceUser } from '@prisma/client';

import { NexusGenFieldTypes } from '../../generated/nexus';
import { UniqueEntityID } from '../../common/UniqueEntityID';

import { User } from '../domain/User';

export class UserMap {
  static toDomain(raw: PersistenceUser): User {
    const user = User.create(
      {
        lastName: raw.lastName,
        firstName: raw.firstName,
        password: raw.password,
        email: raw.email,
        middleName: raw.middleName,
        roles: raw.roles,
      },
      new UniqueEntityID(raw.id),
    );

    return user;
  }

  static toPersistence(user: User): PersistenceUser {
    return {
      id: user.id.toValue(),
      email: user.email,
      password: user.password,
      middleName: user.middleName!,
      firstName: user.firstName!,
      lastName: user.lastName!,
      roles: user.roles,
    };
  }

  static toNexus(user: User): NexusGenFieldTypes['User'] {
    return {
      id: user.id.toValue(),
      email: user.email,
      name: user.getName(),
      roles: user.roles,
      // accounts: null,
    };
  }
}
