import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dtos/createGroup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Group from './group.entity';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
   constructor(
      @InjectRepository(Group)
      private readonly groupRepository: GroupRepository,
   ) {}
   createGroup(payload: CreateGroupDto) {
      const group = this.groupRepository.create(payload);
      return this.groupRepository.save(group);
   }
   findOneById(id: string) {
      return this.groupRepository.findOneBy({
         id,
      });
   }
}
