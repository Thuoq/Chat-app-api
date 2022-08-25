import { Repository } from 'typeorm';
import User from './user.entity';
import { NotFoundException } from '@nestjs/common';

export interface UserRepository extends Repository<User> {
   this: Repository<User>;
   findAll(): Promise<User[]>;
   findOneByFieldUnique(
      fieldName: string,
      valueFieldName: string,
   ): Promise<User | null>;
   getOneByFieldName(fieldName: string, valueFieldName: string): Promise<User>;
   findUserByEmailOrUserName(emailOrUserName: string): Promise<User | null>;
   getUserByEmailOrUserName(emailOrUserName: string): Promise<User>;
}

export const customUserRepository: Pick<
   UserRepository,
   | 'findAll'
   | 'findOneByFieldUnique'
   | 'getOneByFieldName'
   | 'findUserByEmailOrUserName'
   | 'getUserByEmailOrUserName'
> = {
   findAll(): Promise<User[]> {
      return this.find();
   },
   async findOneByFieldUnique(
      fieldName: string,
      valueFieldName: string,
   ): Promise<User | null> {
      const user = await this.findOne({
         where: {
            [`${fieldName}`]: valueFieldName,
         },
      });
      if (!user) {
         throw new NotFoundException();
      }
      return user;
   },
   getOneByFieldName(fieldName: string, valueFieldName: string) {
      return this.findOneByFieldUnique(fieldName, valueFieldName);
   },
   async findUserByEmailOrUserName(userNameOrEmail: string) {
      const user = await this.findOne({
         where: {
            userName: userNameOrEmail,
            email: userNameOrEmail,
         },
      });
      if (!user) throw new NotFoundException();
      return user;
   },
   getUserByEmailOrUserName(userNameOrEmail: string) {
      return this.findUserByEmailOrUserName(userNameOrEmail);
   },
};
