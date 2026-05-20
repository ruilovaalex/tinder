import { Injectable } from '@nestjs/common';
import { ChatPrismaService } from '../../../prisma-clients/chat-prisma.service';
import { MessageEntity } from '../../domain/entities/message.entity';
import {
  ChatRepository,
  ChatRoomEntity,
} from '../../domain/repositories/chat.repository';

@Injectable()
export class PrismaChatRepository implements ChatRepository {
  constructor(private readonly chatDb: ChatPrismaService) {}

  createChatRoom(matchId: number): Promise<ChatRoomEntity> {
    return this.chatDb.chatRoom.create({ data: { matchId } });
  }

  sendMessage(
    chatRoomId: number,
    senderId: number,
    content: string,
  ): Promise<MessageEntity> {
    return this.chatDb.message.create({
      data: {
        chatRoomId,
        senderId,
        content,
      },
    });
  }

  getChatMessages(chatRoomId: number): Promise<MessageEntity[]> {
    return this.chatDb.message.findMany({
      where: { chatRoomId },
      orderBy: { createdAt: 'asc' },
    });
  }
}
