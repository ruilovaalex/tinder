import type { UserRepository } from '../domain/user.repository';
export declare class ChangeSubscriptionUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(userId: number, plan: 'FREE' | 'PREMIUM' | 'GOLD'): Promise<any>;
}
