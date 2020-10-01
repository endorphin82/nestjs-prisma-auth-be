import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConfigService } from '../graphql/schema-config.service';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfigService,
      imports: [PrismaModule, UsersModule, TokensModule],
    }),
    PrismaModule,
    UsersModule,
    TokensModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
