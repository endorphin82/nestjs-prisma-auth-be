import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.tokens();
    t.model.role();
    t.model.firstName();
    t.model.lastName();
    t.model.status();
    t.model.password();

    // t.field('tokens', {
    //   type: 'Token',
    //   list: true,
    //   resolve: async ({ id }) => {
    //     if (!id) return [];
    //
    //     const tokens = await tokenService.getUserTokens({ userId: id });
    //
    //     return tokens.map((token) => TokenMap.toNexus(token));
    //   },
    // });
  },
});
