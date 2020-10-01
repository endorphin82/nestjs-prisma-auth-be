import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { TokenService } from './services/TokenService';
import { PrismaTokenRepository } from './repository/PrismaTokenRepository';


@Module({
  imports: [PrismaModule],
  providers: [
    TokenService,
    { provide: 'ITokenRepository', useClass: PrismaTokenRepository },
  ],
  exports: [TokenService],
})
export class TokensModule { }
