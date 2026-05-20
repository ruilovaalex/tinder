import { Inject, Injectable } from '@nestjs/common';
import { PROFILE_REPOSITORY } from '../domain/repositories/profile.repository';
import type { ProfileRepository } from '../domain/repositories/profile.repository';

@Injectable()
export class AddPhotoUseCase {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(userId: number, url: string) {
    return await this.profileRepository.addPhoto(userId, url);
  }
}
