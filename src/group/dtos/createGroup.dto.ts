import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GroupTYPE } from '../enums';

export class CreateGroupDto {
   @IsString()
   @IsOptional()
   name?: string;

   @IsNotEmpty()
   @IsEnum(GroupTYPE)
   type: GroupTYPE;
}
