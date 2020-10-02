import { arg, extendType, inputObjectType } from '@nexus/schema';
import { UserMap } from '../../mappers/UserMap';

export const CreateUserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createUser', {
      type: 'User',
      args: { data: arg({ type: CreateUserInput, required: true }) },
      resolve: async (_, { data }, { userService }) => {

        // @ts-ignore
        const user = await userService.createUser(data);

        return UserMap.toNexus(user);
      },
    });
  },
});

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.string('email', { required: true });
    t.string('role', { required: true, default: 'EMPLOYEE' });
    t.string('firstName');
    t.string('lastName');
    t.string('status');
    t.string('password', { required: true });
  },
});
