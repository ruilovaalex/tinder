import { UserEntity } from './user.entity';

export interface UserRepository {
  // Gestión de usuarios y lista general
  create(user: Partial<UserEntity>): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  
  // Sistema de interacción (Like/Match)
  saveLike(likerId: number, likedId: number): Promise<void>;
  checkMatch(user1Id: number, user2Id: number): Promise<boolean>;
  createMatch(user1Id: number, user2Id: number): Promise<any>;

  // Gestión de Perfil y Fotos
  updateProfile(userId: number, data: any): Promise<any>;
  addPhoto(userId: number, url: string): Promise<any>;

  // Requerimiento: Música
  addFavoriteMusic(userId: number, music: { title: string, artist: string, genre?: string }): Promise<any>;

  // Requerimiento: Chats y Mensajería
  sendMessage(chatRoomId: number, senderId: number, content: string): Promise<any>;
  getChatMessages(chatRoomId: number): Promise<any[]>;

  // Requerimiento: Suscripción
  updateSubscription(userId: number, plan: string): Promise<any>;
}