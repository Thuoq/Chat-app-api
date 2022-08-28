import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { UserRepository } from './user.repository';
import { RegisterDto } from '../auth/dtos/register.dto';

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
   createUser(payload: RegisterDto) {
      const { confirmationPassword, ...userCredential } = payload;
      const user = this.userRepository.create(userCredential);
      return this.userRepository.save(user);
   }
   getByEmail(email: string) {
      return this.userRepository.getOneByFieldName('email', email);
   }
}
