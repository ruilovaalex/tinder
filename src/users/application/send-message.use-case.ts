import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CHAT_REPOSITORY } from '../domain/repositories/chat.repository';
import type { ChatRepository } from '../domain/repositories/chat.repository';
import { INTERACTION_REPOSITORY } from '../domain/repositories/interaction.repository';
import type { InteractionRepository } from '../domain/repositories/interaction.repository';

@Injectable()
export class SendMessageUseCase {
  constructor(
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepository,
    @Inject(INTERACTION_REPOSITORY)
    private readonly interactionRepository: InteractionRepository,
  ) {}

  async execute(chatRoomId: number, senderId: number, content: string) {
    if (!content || content.trim().length === 0) {
      throw new BadRequestException('El mensaje no puede estar vacio');
    }

    await this.assertCanAccessChat(chatRoomId, senderId);
    return await this.chatRepository.sendMessage(chatRoomId, senderId, content);
  }

  async getHistory(chatRoomId: number, userId: number) {
    await this.assertCanAccessChat(chatRoomId, userId);
    return await this.chatRepository.getChatMessages(chatRoomId);
  }

  private async assertCanAccessChat(
    chatRoomId: number,
    userId: number,
  ): Promise<void> {
    const room = await this.chatRepository.findChatRoom(chatRoomId);
    if (!room) {
      throw new NotFoundException('Sala de chat no encontrada');
    }

    const match = await this.interactionRepository.findMatchById(room.matchId);
    if (!match) {
      throw new NotFoundException('Match no encontrado');
    }

    if (match.user1Id !== userId && match.user2Id !== userId) {
      throw new ForbiddenException('No perteneces a esta conversacion');
    }
  }
}
