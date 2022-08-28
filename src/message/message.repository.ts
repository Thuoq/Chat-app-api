import { Repository } from 'typeorm';
import Message from './message.entity';

export interface MessageRepository extends Repository<Message> {
   this: Repository<Message>;
   findAll(userId: string, groupId: string): Promise<Message[]>;
}

export const customMessageRepository: Pick<MessageRepository, 'findAll'> = {
   async findAll(userId: string, groupId: string) {
      const messages = await this.find({
         userId,
         groupId,
      });
      return messages;
   },
};
