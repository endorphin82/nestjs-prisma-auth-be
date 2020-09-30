import { enumType } from '@nexus/schema';

export const UserRole = enumType({
  name: 'UserRole',
  members: ['ADMIN', 'EMPLOYEE'],
});
