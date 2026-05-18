import type { UserRepository } from '../domain/user.repository';
export declare class AddMusicUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(userId: number, music: {
        title: string;
        artist: string;
        genre?: string;
    }): Promise<any>;
}
