import { extendType, stringArg } from '@nexus/schema';
import { UserMap } from '../../mappers/UserMap';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('users', {
      type: 'User',
      list: true,
      args: { name: stringArg({ nullable: true }) },
      resolve: async (_, __, { userService }) => {
        const users = await userService.getUsers();

        return users.map((user) => UserMap.toNexus(user));
      },
    });
  },
});
