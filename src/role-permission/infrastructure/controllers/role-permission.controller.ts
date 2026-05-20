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
import { RolePermissionService } from '../../application/role-permission.service';
import { CreateRolePermissionDto } from '../../dto/create-role-permission.dto';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('role-permissions')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @RequirePermissions('assign_permission')
  @Post()
  assign(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionService.assign(createRolePermissionDto);
  }

  @RequirePermissions('read_permission')
  @Get()
  findAll() {
    return this.rolePermissionService.findAll();
  }

  @RequirePermissions('read_permission')
  @Get('role/:roleId')
  findByRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.rolePermissionService.findByRole(roleId);
  }

  @RequirePermissions('assign_permission')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolePermissionService.remove(id);
  }
}
