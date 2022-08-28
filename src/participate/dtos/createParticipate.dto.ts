import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParticipateDto {
   @IsString()
   @IsNotEmpty()
   userId: string;

   @IsString()
   @IsNotEmpty()
   groupId: string;
}
