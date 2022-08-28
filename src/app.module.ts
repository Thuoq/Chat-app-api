import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { ParticipateModule } from './participate/participate.module';
import { GroupModule } from './group/group.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
@Module({
   imports: [
      MessageModule,
      UserModule,
      ParticipateModule,
      GroupModule,
      AuthModule,
      ConfigModule.forRoot(configuration),
      DatabaseModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
