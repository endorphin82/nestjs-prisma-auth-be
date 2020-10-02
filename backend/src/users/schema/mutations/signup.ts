import { extendType, inputObjectType, arg } from '@nexus/schema';
import { UserMap } from '../../mappers/UserMap';
import * as moment from 'moment';

export const SignUpUserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('signUp', {
      type: 'AuthPayload',
      args: { data: arg({ type: SignUpInput, required: true }) },
      resolve: async (_, { data }, ctx) => {
        const { user, token } = await ctx.userService.signUpUser(data);
        const expireAt = moment()
          .add(1, 'day')
          .toISOString();
        const userId = user.id.toValue();
        // @ts-ignore
 await ctx.prisma.token.create({ expireAt, userId, token })

        const aftercreate = await ctx.tokenService.createToken({ expireAt, userId, token });
        console.log('signUp aftercreate', aftercreate);
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
