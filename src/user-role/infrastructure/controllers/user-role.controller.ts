import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RequirePermissions } from '../../../auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../../auth/infrastructure/guards/permissions.guard';
import { UserRoleService } from '../../application/user-role.service';
import { CreateUserRoleDto } from '../../dto/create-user-role.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('user-roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @RequirePermissions('assign_role')
  @Post()
  assign(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.assign(createUserRoleDto);
  }

  @RequirePermissions('read_role')
  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @RequirePermissions('read_role')
  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userRoleService.findByUser(userId);
  }

  @RequirePermissions('assign_role')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userRoleService.remove(id);
  }
}
