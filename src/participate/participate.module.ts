import { Module } from '@nestjs/common';
import { ParticipateService } from './participate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ParticipateEntity from './participate.entity';

@Module({
   imports: [TypeOrmModule.forFeature([ParticipateEntity])],
   providers: [ParticipateService],
})
export class ParticipateModule {}
