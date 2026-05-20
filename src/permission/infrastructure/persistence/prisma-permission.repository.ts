import { Injectable } from '@nestjs/common';
import { UserPrismaService } from '../../../prisma-clients/user-prisma.service';
import { CreatePermissionDto } from '../../dto/create-permission.dto';
import { UpdatePermissionDto } from '../../dto/update-permission.dto';
import { PermissionEntity } from '../../domain/entities/permission.entity';
import { PermissionRepository } from '../../domain/repositories/permission.repository';

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
  constructor(private readonly usersDb: UserPrismaService) {}

  create(data: CreatePermissionDto): Promise<PermissionEntity> {
    return this.usersDb.permission.create({ data });
  }

  findAll(): Promise<PermissionEntity[]> {
    return this.usersDb.permission.findMany();
  }

  findOne(id: number): Promise<PermissionEntity> {
    return this.usersDb.permission.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, data: UpdatePermissionDto): Promise<PermissionEntity> {
    return this.usersDb.permission.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<PermissionEntity> {
    return this.usersDb.permission.delete({ where: { id } });
  }
}
