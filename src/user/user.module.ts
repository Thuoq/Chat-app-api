import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {
   getDataSourceToken,
   getRepositoryToken,
   TypeOrmModule,
} from '@nestjs/typeorm';
import User from './user.entity';
import { DataSource } from 'typeorm';
import { customUserRepository } from './user.repository';

@Module({
   imports: [TypeOrmModule.forFeature([User])],
   providers: [
      UserService,
      {
         provide: getRepositoryToken(User),
         inject: [getDataSourceToken()],
         useFactory: (dataSrc: DataSource) => {
            return dataSrc.getRepository(User).extend(customUserRepository);
         },
      },
   ],
   controllers: [UserController],
   exports: [UserService],
})
export class UserModule {}
