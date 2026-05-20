export interface MatchEntity {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: Date;
}

export interface MatchWithChatRoomEntity extends MatchEntity {
  chatRoom: {
    id: number;
    matchId: number;
    createdAt: Date;
  };
}
