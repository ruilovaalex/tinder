import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CHAT_REPOSITORY } from '../domain/repositories/chat.repository';
import type { ChatRepository } from '../domain/repositories/chat.repository';
import { INTERACTION_REPOSITORY } from '../domain/repositories/interaction.repository';
import type { InteractionRepository } from '../domain/repositories/interaction.repository';
import { USER_REPOSITORY } from '../domain/repositories/user.repository';
import type { UserRepository } from '../domain/repositories/user.repository';

@Injectable()
export class GiveLikeUseCase {
  constructor(
    @Inject(INTERACTION_REPOSITORY)
    private readonly interactionRepository: InteractionRepository,
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(likerId: number, likedId: number) {
    if (likerId === likedId) {
      throw new BadRequestException('No puedes darte like a ti mismo');
    }

    if (!(await this.userRepository.findById(likedId))) {
      throw new NotFoundException('Usuario objetivo no encontrado');
    }

    await this.interactionRepository.saveLike(likerId, likedId);

    const isMatch = await this.interactionRepository.hasReciprocalLike(
      likerId,
      likedId,
    );

    if (isMatch) {
      const matchData = await this.interactionRepository.createMatch(
        likerId,
        likedId,
      );
      const chatRoom = await this.chatRepository.createChatRoom(matchData.id);

      return {
        match: true,
        message: 'Es un Match! Sala de chat creada.',
        chatRoomId: chatRoom.id,
      };
    }

    return { match: false, message: 'Like enviado' };
  }
}
