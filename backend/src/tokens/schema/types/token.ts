import { objectType } from '@nexus/schema';

// export const Product = objectType({
//   name: 'Product',
//   definition(t) {
//     t.id('id');
//     t.string('title');
//     t.string('description');
//     t.string('categoryId');
//     t.int('price');
//   },
// });
export const Token = objectType({
  name: 'Token',
  definition(t) {
    t.model.id();
    t.model.token();
    t.model.uId();
    t.model.expireAt();
  },
});
