import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageRepository } from './message.repository';
import Message from './message.entity';
import CreateMessageDto from './dtos/createMessage.dto';
import { DataSource } from 'typeorm';
import { GroupService } from '../group/group.service';
import { GroupTYPE } from '../group/enums';
import Group from '../group/group.entity';
import { UserService } from '../user/user.service';
import ParticipateEntity from '../participate/participate.entity';
import User from '../user/user.entity';

@Injectable()
export class MessageService {
   constructor(
      @InjectRepository(Message)
      private readonly messageRepository: MessageRepository,
      private dataSrc: DataSource,
      private readonly groupService: GroupService,
      private readonly userService: UserService,
   ) {}

   async createMessage(payload: CreateMessageDto, currentUser: User) {
      let group = await this.groupService.findOneById(payload.groupId);
      const user = await this.userService.getByEmail(payload.email);
      return await this.dataSrc.manager.transaction(
         async (transactionalEntityManager) => {
            if (!group) {
               const newGroup = transactionalEntityManager.create(Group, {
                  type: GroupTYPE.PRIVATE_PERSON_TO_PERSON,
               });
               group = await transactionalEntityManager.save(Group, newGroup);
               const participate = transactionalEntityManager.create(
                  ParticipateEntity,
                  {
                     group,
                     user,
                  },
               );
               const participateCurrentUser = transactionalEntityManager.create(
                  ParticipateEntity,
                  {
                     group,
                     user: currentUser,
                  },
               );
               const participatePromiseArray = [
                  transactionalEntityManager.save(
                     ParticipateEntity,
                     participate,
                  ),
                  transactionalEntityManager.save(
                     ParticipateEntity,
                     participateCurrentUser,
                  ),
               ];
               await Promise.all(participatePromiseArray);
            }
            const message = transactionalEntityManager.create(Message, {
               ...payload,
               group,
               user,
            });
            return transactionalEntityManager.save(message);
         },
      );
   }
}
