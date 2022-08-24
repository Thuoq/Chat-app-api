import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}
   @Post('login')
   async login(@Body() payload: LoginDto) {
      return await this.authService.login(payload);
   }

   @Post('register')
   async register(@Body() payload: RegisterDto) {
      return await this.authService.register(payload);
   }
}
