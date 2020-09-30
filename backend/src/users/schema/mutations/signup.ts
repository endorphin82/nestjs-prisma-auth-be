import { extendType, inputObjectType, arg } from '@nexus/schema';
import { UserMap } from '../../mappers/UserMap';

export const SignUpUserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('signUp', {
      type: 'AuthPayload',
      args: { data: arg({ type: SignUpInput, required: true }) },
      resolve: async (_, { data }, { userService }) => {
        const { user, token } = await userService.signUpUser(data);

        return {
          token,
          user: UserMap.toNexus(user),
        };
      },
    });
  },
});

export const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
    t.string('firstName');
    t.string('lastName');
  },
});
