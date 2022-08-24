import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(User) private readonly userRepository: UserRepository,
   ) {}
   async login(payload: LoginDto) {
      const user = await this.userRepository.findBy({
         userName: payload.username,
      });
      if (!user) {
         throw new NotFoundException();
      }
      return user;
   }
   async register(payload: RegisterDto) {
      const { confirmationPassword, ...userCredential } = payload;
      const user = this.userRepository.create(userCredential);
      return await this.userRepository.save(user);
   }
}
