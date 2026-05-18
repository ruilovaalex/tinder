import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';

@Injectable()
export class AddMusicUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(userId: number, music: { title: string, artist: string, genre?: string }) {
    return await this.userRepository.addFavoriteMusic(userId, music);
  }
}