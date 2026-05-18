import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';

@Injectable()
export class SendMessageUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  // Este método guarda el mensaje nuevo
  async execute(chatRoomId: number, senderId: number, content: string) {
    if (!content || content.trim().length === 0) {
      throw new Error('El mensaje no puede estar vacío');
    }

    return await this.userRepository.sendMessage(chatRoomId, senderId, content);
  }
  async getHistory(chatRoomId: number) {
    const messages = await this.userRepository.getChatMessages(chatRoomId);
    
    if (!messages) {
      return [];
    }

    return messages;
  }
}