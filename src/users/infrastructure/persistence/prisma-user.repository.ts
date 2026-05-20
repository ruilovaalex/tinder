import { Injectable } from '@nestjs/common';
import { UserPrismaService } from '../../../prisma-clients/user-prisma.service';
import { UserEntity } from '../../domain/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly usersDb: UserPrismaService) {}

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.usersDb.user.create({
      data: {
        name: data.name!,
        email: data.email!,
        age: data.age!,
      },
    });

    return new UserEntity(
      user.id,
      user.name,
      user.email,
      user.age,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.usersDb.user.findUnique({ where: { id } });

    if (!user) return null;

    return new UserEntity(
      user.id,
      user.name,
      user.email,
      user.age,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.usersDb.user.findMany();

    return users.map(
      (user) =>
        new UserEntity(
          user.id,
          user.name,
          user.email,
          user.age,
          user.createdAt,
          user.updatedAt,
        ),
    );
  }
}
