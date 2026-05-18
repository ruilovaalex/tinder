import type { UserRepository } from '../domain/user.repository';
export declare class GetAllUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<import("../domain/user.entity").UserEntity[]>;
}
