import { Injectable } from '@nestjs/common';
import { UserPrismaService } from '../../../prisma-clients/user-prisma.service';
import { MusicEntity } from '../../domain/entities/music.entity';
import { PhotoEntity } from '../../domain/entities/photo.entity';
import { ProfileEntity } from '../../domain/entities/profile.entity';
import {
  AddMusicData,
  ProfileRepository,
  UpdateProfileData,
} from '../../domain/repositories/profile.repository';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly usersDb: UserPrismaService) {}

  createEmptyProfile(userId: number): Promise<ProfileEntity> {
    return this.usersDb.profile.create({ data: { userId } });
  }

  async updateProfile(
    userId: number,
    data: UpdateProfileData,
  ): Promise<ProfileEntity> {
    const profile = await this.usersDb.profile.findFirst({
      where: { userId },
    });

    if (profile) {
      return await this.usersDb.profile.update({
        where: { id: profile.id },
        data,
      });
    }

    return await this.usersDb.profile.create({
      data: { userId, ...data },
    });
  }

  addPhoto(userId: number, url: string): Promise<PhotoEntity> {
    return this.usersDb.photo.create({ data: { url, userId } });
  }

  async addFavoriteMusic(
    userId: number,
    music: AddMusicData,
  ): Promise<MusicEntity> {
    await this.usersDb.user.findUniqueOrThrow({ where: { id: userId } });

    return await this.usersDb.music.create({
      data: {
        title: music.title,
        artist: music.artist,
        genre: music.genre,
      },
    });
  }
}
