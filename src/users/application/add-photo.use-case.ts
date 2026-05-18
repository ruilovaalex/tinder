import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';

@Injectable()
export class AddPhotoUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(userId: number, url: string) {
    return await this.userRepository.addPhoto(userId, url);
  }
}