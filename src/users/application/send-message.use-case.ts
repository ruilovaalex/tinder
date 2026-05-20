import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY } from '../domain/repositories/chat.repository';
import type { ChatRepository } from '../domain/repositories/chat.repository';

@Injectable()
export class SendMessageUseCase {
  constructor(
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepository,
  ) {}

  async execute(chatRoomId: number, senderId: number, content: string) {
    if (!content || content.trim().length === 0) {
      throw new Error('El mensaje no puede estar vacio');
    }

    return await this.chatRepository.sendMessage(chatRoomId, senderId, content);
  }

  async getHistory(chatRoomId: number) {
    return await this.chatRepository.getChatMessages(chatRoomId);
  }
}
