import { MessageEntity } from '../entities/message.entity';

export const CHAT_REPOSITORY = 'CHAT_REPOSITORY';

export interface ChatRoomEntity {
  id: number;
  matchId: number;
  createdAt: Date;
}

export interface ChatRepository {
  createChatRoom(matchId: number): Promise<ChatRoomEntity>;
  sendMessage(
    chatRoomId: number,
    senderId: number,
    content: string,
  ): Promise<MessageEntity>;
  getChatMessages(chatRoomId: number): Promise<MessageEntity[]>;
}
