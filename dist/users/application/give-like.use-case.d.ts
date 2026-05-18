import type { UserRepository } from '../domain/user.repository';
export declare class GiveLikeUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(likerId: number, likedId: number): Promise<{
        match: boolean;
        message: string;
        chatRoomId: any;
    } | {
        match: boolean;
        message: string;
        chatRoomId?: undefined;
    }>;
}
