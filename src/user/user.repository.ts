import { Repository } from 'typeorm';
import User from './user.entity';

interface UserRepository extends Repository<User> {
   this: Repository<User>;
   findAll(): Promise<User[]>;
}

const customUserRepository: Pick<UserRepository, 'findAll'> = {
   findAll(): Promise<User[]> {
      return this.find();
   },
};
