import { extendType } from '@nexus/schema';


export const DeleteProductMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.deleteOneToken()
  },
});

