import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/tokenPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromExtractors([
            (req: Request) => {
               return req?.cookies?.Authentication;
            },
         ]),
         secretOrKey: configService.get('JWT_SECRET'),
      });
   }
   async validate(payload: TokenPayload) {
      const user = await this.userService.findOneById(payload.userId);
      return user;
   }
}
