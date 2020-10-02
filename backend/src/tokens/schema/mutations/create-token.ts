import { arg, extendType, inputObjectType } from '@nexus/schema';
import { TokenMap } from '../../mappers/TokenMap';


export const CreateTokenMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createToken', {
      type: 'Token',
      args: { data: arg({ type: CreateTokenInput, required: true }) },
      resolve: async (_, { data }, { tokenService }) => {

        // @ts-ignore
        const token = await tokenService.createToken(data);

        return TokenMap.toNexus(token);
      },
    });
  },
});

export const CreateTokenInput = inputObjectType({
  name: 'CreateTokenInput',
  definition(t) {
    t.string('token');
    t.string('expireAt');
    t.string('userId');
  },
});
