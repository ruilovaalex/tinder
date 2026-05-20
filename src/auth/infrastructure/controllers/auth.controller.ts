import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../../application/auth.service';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import type { AuthResponse } from '../../interfaces/auth-response.interface';
import type { AuthenticatedUser } from '../../interfaces/authenticated-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: AuthenticatedUser): AuthenticatedUser {
    return user;
  }
}
