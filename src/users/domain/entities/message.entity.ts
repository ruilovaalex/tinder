export interface MessageEntity {
  id: number;
  chatRoomId: number;
  senderId: number;
  content: string;
  createdAt: Date;
  readAt: Date | null;
}
