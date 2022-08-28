import { Repository } from 'typeorm';
import Group from './group.entity';

export interface GroupRepository extends Repository<Group> {
   this: Repository<Group>;
   findAll(): Promise<Group[]>;
}

export const customGroupRepository: Pick<GroupRepository, 'findAll'> = {
   findAll(): Promise<Group[]> {
      return this.find();
   },
};
