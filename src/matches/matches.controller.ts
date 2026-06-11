import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthenticatedUser } from '../auth/auth.types';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { MatchesService } from './matches.service';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Permissions('match:view')
  @Get('me')
  findMine(@Request() request: ExpressRequest & { user: AuthenticatedUser }) {
    return this.matchesService.findMine(request.user.userId);
  }
}
