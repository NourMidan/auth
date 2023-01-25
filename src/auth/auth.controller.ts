import { Controller, Get, Post, Body,UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthGuard } from './guards/local-auth.guard';
import { GetUser } from './user.decorater';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService ) {}

  @Post('signup')
  register(@Body() createUserDto: RegisterUserDto) {
    return this.authService.register(createUserDto);
  }





  @UseGuards(LocalAuthGuard)
  @Post('signin')
 async login(@Request() req) {
    return await this.authService.login(req.user);

  }

  @UseGuards(JwtAuthGuard)  
  @Get( )
  vlaidateUser(@GetUser() user ) {
    return user
  }
}
