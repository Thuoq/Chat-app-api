import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
   getDataSourceToken,
   getRepositoryToken,
   InjectDataSource,
   TypeOrmModule,
} from '@nestjs/typeorm';
import User from '../user/user.entity';
import { DataSource } from 'typeorm';
import { customUserRepository } from '../user/user.repository';

@Module({
   imports: [TypeOrmModule.forFeature([User])],
   providers: [
      AuthService,
      {
         provide: getRepositoryToken(User),
         inject: [getDataSourceToken()],
         useFactory: (dataSource: DataSource) => {
            return dataSource.getRepository(User).extend(customUserRepository);
         },
      },
   ],
   controllers: [AuthController],
})
export class AuthModule {}
