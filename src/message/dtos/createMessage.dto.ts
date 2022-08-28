import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateMessageDto {
   @IsNotEmpty()
   @IsString()
   content: string;
   @IsNotEmpty()
   @IsString()
   email: string;

   @IsOptional()
   @IsString()
   groupId?: string;
}
