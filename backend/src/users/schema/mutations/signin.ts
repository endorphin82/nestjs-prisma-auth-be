import { extendType, inputObjectType, arg } from '@nexus/schema';
import { UserMap } from '../../mappers/UserMap';

export const SignInUserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('signIn', {
      type: 'AuthPayload',
      args: { data: arg({ type: SignInInput, required: true }) },
      resolve: async (_, { data }, { userService }) => {
        const { user, token } = await userService.signInUser(data);

        return {
          token,
          user: UserMap.toNexus(user),
        };
      },
    });
  },
});

export const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
  },
});
