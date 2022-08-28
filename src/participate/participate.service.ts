import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Participate from './participate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipateService {
   constructor(
      @InjectRepository(Participate)
      private readonly participateRepository: Repository<Participate>,
   ) {}
}
