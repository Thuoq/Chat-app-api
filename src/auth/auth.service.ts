import {
   BadRequestException,
   HttpException,
   HttpStatus,
   Injectable,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { TokenPayload } from '../interfaces/tokenPayload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
   constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
   ) {}
   register(payload: RegisterDto) {
      return this.userService.createUser(payload);
   }
   async verifyPassword(passwordText, hashPassword) {
      const isCorrect = await bcrypt.compare(passwordText, hashPassword);
      if (!isCorrect) {
         throw new BadRequestException('Wrong credentials provided');
      }
   }
   async getAuthenticatedUser(email: string, plainTextPassword: string) {
      try {
         const user = await this.userService.getByEmail(email);
         await this.verifyPassword(plainTextPassword, user.password);
         user.password = undefined;
         return user;
      } catch (error) {
         throw new HttpException(
            'Wrong credentials provided',
            HttpStatus.BAD_REQUEST,
         );
      }
   }
   getCookieWithJwtToken(userId: string) {
      const payload: TokenPayload = { userId };
      const token = this.jwtService.sign(payload);
      return `Authentication=${token};HttpOnly;Path=/;Max-Age=${this.configService.get(
         'JWT_EXPIRATION_TIME',
      )}`;
   }
   getCookieForLogOut() {
      return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
   }
}
