import { extendType, stringArg } from '@nexus/schema';
import { UserMap } from '../../mappers/UserMap';

export const UserMeQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('me', {
      type: 'User',
      nullable: true,
      args: { name: stringArg({ nullable: true }) },
      resolve: (_, __, { user }) => {
        if (!user) return null;

        return UserMap.toNexus(user);
      },
    });
  },
});
