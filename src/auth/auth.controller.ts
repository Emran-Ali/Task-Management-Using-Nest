import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body(ValidationPipe) credential: LoginDto) {
    console.log(credential, 'credential');
    return this.authService.loginUser(credential);
  }

  @Post('/logout')
  logout() {
    return this.authService.logoutUser();
  }
}
