import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { TokenService } from './services/TokenService';
import { PrismaTokensRepository } from './repository/prisma-tokens-repository.service';


@Module({
  imports: [PrismaModule],
  providers: [
    TokenService,
    { provide: 'ITokenRepository', useClass: PrismaTokensRepository },
  ],
  exports: [TokenService],
})
export class TokensModule { }
