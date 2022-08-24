import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import DateAuditEntity from '../utils/dateAudit.entity';

@Entity()
class User extends DateAuditEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;
   @Column({
      unique: true,
   })
   userName: string;
   @Column({
      unique: true,
   })
   email: string;
   @Column()
   password: string;
}
export default User;
