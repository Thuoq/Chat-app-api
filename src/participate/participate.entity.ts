import { JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';
import DateAuditEntity from '../utils/dateAudit.entity';
import Group from '../group/group.entity';

class Participate extends DateAuditEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => User)
   @JoinColumn()
   user: User;

   @ManyToOne(() => Group)
   @JoinColumn()
   group: Group;
}
export default Participate;
