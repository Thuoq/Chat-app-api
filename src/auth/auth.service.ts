import {
   HttpException,
   HttpStatus,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
   constructor(
      @InjectRepository(User) private readonly userRepository: UserRepository,
   ) {}

   async login(payload: LoginDto) {
      const user = await this.userRepository.findOne({
         where: {
            userName: payload.userName,
         },
         select: {
            id: true,
            userName: true,
            email: true,
            password: true,
         },
      });
      if (!user) throw new NotFoundException();
      if (!this.isPasswordCorrect)
         throw new HttpException(
            'password or email incorrect',
            HttpStatus.BAD_REQUEST,
         );
      return user;
   }

   async register(payload: RegisterDto) {
      const { confirmationPassword, ...userCredential } = payload;
      const user = this.userRepository.create(userCredential);
      return await this.userRepository.save(user);
   }
   async isPasswordCorrect(passwordText, hashPassword) {
      return await bcrypt.compare(passwordText, hashPassword);
   }
}
