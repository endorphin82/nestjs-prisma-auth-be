import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './services/UserService';
import { PrismaUsersRepository } from './repository/PrismaUserRepository';

@Module({
  imports: [PrismaModule],
  providers: [
    UserService,
    { provide: 'IUserRepository', useClass: PrismaUsersRepository },
  ],
  exports: [UserService],
})
export class UsersModule { }
