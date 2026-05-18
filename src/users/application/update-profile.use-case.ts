import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';

@Injectable()
export class UpdateProfileUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(userId: number, bio: string, gender: string, city: string) {
    return await this.userRepository.updateProfile(userId, { bio, gender, city });
  }
}