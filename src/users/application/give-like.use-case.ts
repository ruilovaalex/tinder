import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';

@Injectable()
export class GiveLikeUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async execute(likerId: number, likedId: number) {
    if (likerId === likedId) throw new Error('No puedes darte like a ti mismo');

    // 1. Guardar el like
    await this.userRepository.saveLike(likerId, likedId);

    // 2. Verificar reciprocidad
    const isMatch = await this.userRepository.checkMatch(likerId, likedId);

    if (isMatch) {
      // 3. CREAR EL MATCH Y LA CHATROOM
      const matchData = await this.userRepository.createMatch(likerId, likedId);
      return { 
        match: true, 
        message: '¡Es un Match! Sala de chat creada.',
        chatRoomId: matchData.chatRoom.id 
      };
    }

    return { match: false, message: 'Like enviado' };
  }
}