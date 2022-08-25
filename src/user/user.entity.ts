import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import DateAuditEntity from '../utils/dateAudit.entity';
import * as bcrypt from 'bcrypt';

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
   @Column({
      select: false,
   })
   password: string;
   @BeforeInsert()
   async hashPassword() {
      this.password = await bcrypt.hash(
         this.password,
         parseInt(process.env.SALT),
      );
   }
}
export default User;
