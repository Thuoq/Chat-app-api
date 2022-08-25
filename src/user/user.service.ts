import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User) private readonly userRepository: UserRepository,
   ) {}

   async findOneById(id: string) {
      const user = await this.userRepository.findOneById(id);
      if (!user) {
         throw new NotFoundException();
      }
      return user;
   }
}
