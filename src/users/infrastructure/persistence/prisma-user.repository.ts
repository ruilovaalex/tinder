import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity } from '../../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name!,
        email: data.email!,
        age: data.age!,
        profile: { create: {} },
        subscription: { create: { plan: 'FREE' } }
      },
    });
    return new UserEntity(user.id, user.name, user.email, user.age, user.createdAt, user.updatedAt);
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      include: { 
        profile: true, 
        favoriteMusic: true, 
        photos: true, 
        subscription: true 
      } 
    });
    if (!user) return null;
    return new UserEntity(user.id, user.name, user.email, user.age, user.createdAt, user.updatedAt);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({ include: { profile: true } });
    return users.map(u => new UserEntity(u.id, u.name, u.email, u.age, u.createdAt, u.updatedAt));
  }

  // --- LÓGICA DE INTERACCIÓN ---

  async saveLike(likerId: number, likedId: number): Promise<void> {
    await this.prisma.like.create({ data: { likerId, likedId } });
  }

  async checkMatch(user1Id: number, user2Id: number): Promise<boolean> {
    const like = await this.prisma.like.findFirst({
      where: { likerId: user2Id, likedId: user1Id }
    });
    return !!like;
  }

  async createMatch(user1Id: number, user2Id: number): Promise<any> {
    return await this.prisma.match.create({
      data: {
        user1Id,
        user2Id,
        chatRoom: { create: {} } // Crea automáticamente la sala de chat
      },
      include: { chatRoom: true }
    });
  }

  // --- GESTIÓN DE PERFIL, FOTOS Y MÚSICA ---

  async updateProfile(userId: number, data: any): Promise<any> {
    return await this.prisma.profile.update({
      where: { userId },
      data
    });
  }

  async addPhoto(userId: number, url: string): Promise<any> {
    return await this.prisma.photo.create({ data: { url, userId } });
  }

  async addFavoriteMusic(userId: number, music: { title: string, artist: string, genre?: string }): Promise<any> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        favoriteMusic: { create: music }
      }
    });
  }

  // --- MENSAJERÍA (TABLA Message) ---

  async sendMessage(chatRoomId: number, senderId: number, content: string): Promise<any> {
    return await this.prisma.message.create({
      data: {
        chatRoomId,
        senderId,
        content
      }
    });
  }

  async getChatMessages(chatRoomId: number): Promise<any[]> {
    return await this.prisma.message.findMany({
      where: { chatRoomId },
      orderBy: { createdAt: 'asc' },
      include: { sender: true }
    });
  }

  // --- SUSCRIPCIÓN ---

  async updateSubscription(userId: number, plan: string): Promise<any> {
    return await this.prisma.subscription.update({
      where: { userId },
      data: { plan }
    });
  }
}