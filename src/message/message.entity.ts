import {
   Column,
   Entity,
   PrimaryGeneratedColumn,
   JoinColumn,
   ManyToOne,
} from 'typeorm';
import User from '../user/user.entity';
import Group from '../group/group.entity';
import DateAuditEntity from '../utils/dateAudit.entity';

@Entity()
class Message extends DateAuditEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;
   @Column()
   content: string;

   @ManyToOne(() => User)
   @JoinColumn()
   user: User;

   @ManyToOne(() => Group)
   @JoinColumn()
   group: Group;
}
export default Message;
