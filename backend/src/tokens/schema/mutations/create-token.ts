import {  extendType } from '@nexus/schema';


export const CreateProductMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneToken();
    // t.field('createUser', {
    //   type: 'User',
    //   args: { data: arg({ type: CreateteProductInput, required: true }) },
    //   resolve: async (_, { data }, { productService }) => {
    //     const user = await productService.createUser(data);
    //
    //     return UserMap.toNexus(user);
    //   },
    // });
  },
});

// export const CreateProductInput = inputObjectType({
//   name: 'CreateProductInput',
//   definition(t) {
//     t.string('email', { required: true });
//     t.string('password', { required: true });
//     t.string('firstName');
//     t.string('middleName');
//     t.string('lastName');
//
//   },
// });
