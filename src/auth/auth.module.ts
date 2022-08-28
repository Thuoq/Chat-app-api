import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
   imports: [
      UserModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => {
            return {
               secret: configService.get('JWT_SECRET'),
               signOptions: {
                  expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
               },
            };
         },
      }),
      ConfigModule,
   ],
   providers: [AuthService, LocalStrategy, JwtStrategy],
   controllers: [AuthController],
})
export class AuthModule {}
