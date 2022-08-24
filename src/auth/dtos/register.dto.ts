import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from '../../decorator/match.decorator';

export class RegisterDto {
   @IsString()
   @IsNotEmpty()
   userName: string;

   @IsString()
   @IsNotEmpty()
   password: string;

   @IsNotEmpty()
   @IsString()
   @IsEmail()
   email: string;

   @IsString()
   @IsNotEmpty()
   @Match('password')
   confirmationPassword: string;
}
