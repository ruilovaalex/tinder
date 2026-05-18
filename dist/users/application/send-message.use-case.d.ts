import type { UserRepository } from '../domain/user.repository';
export declare class SendMessageUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(chatRoomId: number, senderId: number, content: string): Promise<any>;
    getHistory(chatRoomId: number): Promise<any[]>;
}
