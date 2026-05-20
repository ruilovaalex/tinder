import { Injectable } from '@nestjs/common';
import { InteractionPrismaService } from '../../../prisma-clients/interaction-prisma.service';
import { MatchEntity } from '../../domain/entities/interaction.entity';
import { InteractionRepository } from '../../domain/repositories/interaction.repository';

@Injectable()
export class PrismaInteractionRepository implements InteractionRepository {
  constructor(private readonly interactionsDb: InteractionPrismaService) {}

  async saveLike(likerId: number, likedId: number): Promise<void> {
    await this.interactionsDb.like.create({ data: { likerId, likedId } });
  }

  async hasReciprocalLike(user1Id: number, user2Id: number): Promise<boolean> {
    const like = await this.interactionsDb.like.findFirst({
      where: { likerId: user2Id, likedId: user1Id },
    });

    return !!like;
  }

  createMatch(user1Id: number, user2Id: number): Promise<MatchEntity> {
    return this.interactionsDb.match.create({
      data: { user1Id, user2Id },
    });
  }
}
