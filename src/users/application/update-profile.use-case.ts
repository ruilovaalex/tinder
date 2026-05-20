import { Inject, Injectable } from '@nestjs/common';
import { PROFILE_REPOSITORY } from '../domain/repositories/profile.repository';
import type { ProfileRepository } from '../domain/repositories/profile.repository';

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(userId: number, bio: string, gender: string, city: string) {
    return await this.profileRepository.updateProfile(userId, {
      bio,
      gender,
      city,
    });
  }
}
