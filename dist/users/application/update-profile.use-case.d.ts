import type { UserRepository } from '../domain/user.repository';
export declare class UpdateProfileUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(userId: number, bio: string, gender: string, city: string): Promise<any>;
}
