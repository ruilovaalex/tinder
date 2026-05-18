import type { UserRepository } from '../domain/user.repository';
export declare class AddPhotoUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(userId: number, url: string): Promise<any>;
}
