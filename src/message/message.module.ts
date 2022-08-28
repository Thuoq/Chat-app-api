import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import {
   getDataSourceToken,
   getRepositoryToken,
   TypeOrmModule,
} from '@nestjs/typeorm';
import Message from './message.entity';
import { DataSource } from 'typeorm';
import { customUserRepository } from '../user/user.repository';
import { GroupModule } from '../group/group.module';
import { UserModule } from '../user/user.module';

@Module({
   imports: [TypeOrmModule.forFeature([Message]), GroupModule, UserModule],
   controllers: [MessageController],
   providers: [
      MessageService,
      {
         provide: getRepositoryToken(Message),
         inject: [getDataSourceToken()],
         useFactory: (dataSrc: DataSource) => {
            return dataSrc.getRepository(Message).extend(customUserRepository);
         },
      },
   ],
})
export class MessageModule {}
