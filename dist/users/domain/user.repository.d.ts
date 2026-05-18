import { UserEntity } from './user.entity';
export interface UserRepository {
    create(user: Partial<UserEntity>): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    saveLike(likerId: number, likedId: number): Promise<void>;
    checkMatch(user1Id: number, user2Id: number): Promise<boolean>;
    createMatch(user1Id: number, user2Id: number): Promise<any>;
    updateProfile(userId: number, data: any): Promise<any>;
    addPhoto(userId: number, url: string): Promise<any>;
    addFavoriteMusic(userId: number, music: {
        title: string;
        artist: string;
        genre?: string;
    }): Promise<any>;
    sendMessage(chatRoomId: number, senderId: number, content: string): Promise<any>;
    getChatMessages(chatRoomId: number): Promise<any[]>;
    updateSubscription(userId: number, plan: string): Promise<any>;
}
