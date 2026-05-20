import { MusicEntity } from '../entities/music.entity';
import { PhotoEntity } from '../entities/photo.entity';
import { ProfileEntity } from '../entities/profile.entity';

export const PROFILE_REPOSITORY = 'PROFILE_REPOSITORY';

export interface UpdateProfileData {
  bio: string;
  gender: string;
  city: string;
}

export interface AddMusicData {
  title: string;
  artist: string;
  genre?: string;
}

export interface ProfileRepository {
  createEmptyProfile(userId: number): Promise<ProfileEntity>;
  updateProfile(userId: number, data: UpdateProfileData): Promise<ProfileEntity>;
  addPhoto(userId: number, url: string): Promise<PhotoEntity>;
  addFavoriteMusic(userId: number, music: AddMusicData): Promise<MusicEntity>;
}
