import { MatchEntity } from '../entities/interaction.entity';

export const INTERACTION_REPOSITORY = 'INTERACTION_REPOSITORY';

export interface InteractionRepository {
  saveLike(likerId: number, likedId: number): Promise<void>;
  hasReciprocalLike(user1Id: number, user2Id: number): Promise<boolean>;
  createMatch(user1Id: number, user2Id: number): Promise<MatchEntity>;
}
