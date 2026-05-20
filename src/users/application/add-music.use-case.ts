import { Inject, Injectable } from '@nestjs/common';
import { PROFILE_REPOSITORY } from '../domain/repositories/profile.repository';
import type {
  AddMusicData,
  ProfileRepository,
} from '../domain/repositories/profile.repository';

@Injectable()
export class AddMusicUseCase {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(userId: number, music: AddMusicData) {
    return await this.profileRepository.addFavoriteMusic(userId, music);
  }
}
