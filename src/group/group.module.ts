import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import {
   getDataSourceToken,
   getRepositoryToken,
   TypeOrmModule,
} from '@nestjs/typeorm';
import Group from './group.entity';
import { DataSource } from 'typeorm';
import { customGroupRepository } from './group.repository';

@Module({
   imports: [TypeOrmModule.forFeature([Group])],
   controllers: [GroupController],
   providers: [
      GroupService,
      {
         provide: getRepositoryToken(Group),
         inject: [getDataSourceToken()],
         useFactory: (dataSrc: DataSource) => {
            return dataSrc.getRepository(Group).extend(customGroupRepository);
         },
      },
   ],
   exports: [GroupService],
})
export class GroupModule {}
