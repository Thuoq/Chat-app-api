import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GroupTYPE } from './enums';

@Entity()
class Group extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({
      nullable: true,
   })
   name?: string;

   @Column({
      type: 'enum',
      enum: GroupTYPE,
      default: GroupTYPE.PRIVATE_PERSON_TO_PERSON,
   })
   type: GroupTYPE;
}
export default Group;
