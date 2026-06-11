import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InteractionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Injectable()
export class InteractionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(fromUserId: number, dto: CreateInteractionDto) {
    if (fromUserId === dto.toUserId) {
      throw new BadRequestException('No puedes interactuar contigo mismo');
    }

    const targetUser = await this.prisma.user.findUnique({
      where: { id: dto.toUserId },
    });

    if (!targetUser) {
      throw new NotFoundException('Usuario objetivo no encontrado');
    }

    const interaction = await this.prisma.interaction.upsert({
      where: {
        fromUserId_toUserId: {
          fromUserId,
          toUserId: dto.toUserId,
        },
      },
      update: {
        type: dto.type,
      },
      create: {
        fromUserId,
        toUserId: dto.toUserId,
        type: dto.type,
      },
    });

    const match = await this.tryCreateMatch(fromUserId, dto.toUserId, dto.type);

    return {
      interaction,
      matchCreated: !!match,
      match,
    };
  }

  async findMine(userId: number) {
    return this.prisma.interaction.findMany({
      where: { fromUserId: userId },
      include: {
        toUser: {
          select: {
            id: true,
            email: true,
            role: true,
            profile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async tryCreateMatch(
    fromUserId: number,
    toUserId: number,
    type: InteractionType,
  ) {
    if (type !== InteractionType.LIKE && type !== InteractionType.SUPERLIKE) {
      return null;
    }

    const reciprocal = await this.prisma.interaction.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      },
    });

    if (
      !reciprocal ||
      (reciprocal.type !== InteractionType.LIKE &&
        reciprocal.type !== InteractionType.SUPERLIKE)
    ) {
      return null;
    }

    const [user1Id, user2Id] = [fromUserId, toUserId].sort((a, b) => a - b);

    return this.prisma.match.upsert({
      where: {
        user1Id_user2Id: {
          user1Id,
          user2Id,
        },
      },
      update: {},
      create: {
        user1Id,
        user2Id,
      },
    });
  }
}
