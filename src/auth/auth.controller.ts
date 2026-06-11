import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthenticatedUser } from './auth.types';
import { Permissions } from './permissions.decorator';
import { PermissionsGuard } from './permissions.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('auth:me')
  @Get('me')
  me(@Request() request: ExpressRequest & { user: AuthenticatedUser }) {
    return this.authService.me(request.user);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('auth:logout')
  @Post('logout')
  logout(@Request() request: ExpressRequest & { user: AuthenticatedUser }) {
    return this.authService.logout(request.user);
  }
}
