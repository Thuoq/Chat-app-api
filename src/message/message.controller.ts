import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import CreateMessageDto from './dtos/createMessage.dto';
import { MessageService } from './message.service';
import { RequestWithUser } from '../interfaces/requestWithUser';
import { JwtGuard } from '../guards/jwt.guard';
@Controller('message')
export class MessageController {
   constructor(private readonly messageService: MessageService) {}
   @UseGuards(JwtGuard)
   @Post()
   async createMessage(
      @Req() currentUser: RequestWithUser,
      @Body() payload: CreateMessageDto,
   ) {
      return await this.messageService.createMessage(payload, currentUser.user);
   }
}
