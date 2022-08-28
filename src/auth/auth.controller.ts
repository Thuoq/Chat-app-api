import {
   Body,
   Controller,
   HttpStatus,
   Post,
   Req,
   Res,
   UseGuards,
   HttpCode,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { RequestWithUser } from '../interfaces/requestWithUser';
import { JwtGuard } from '../guards/jwt.guard';
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @HttpCode(HttpStatus.OK)
   @UseGuards(LocalAuthenticationGuard)
   @Post('login')
   login(@Req() req: RequestWithUser, @Res() res: Response) {
      const user = req.user;
      const cookie = this.authService.getCookieWithJwtToken(user.id);
      res.setHeader('Set-Cookie', cookie);
      return res.send(user);
   }

   @Post('register')
   async register(@Body() payload: RegisterDto) {
      return await this.authService.register(payload);
   }
   @UseGuards(JwtGuard)
   @Post('logout')
   async logOut(@Req() req: Request, @Res() res: Response) {
      res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
      return res.sendStatus(HttpStatus.OK);
   }
}
