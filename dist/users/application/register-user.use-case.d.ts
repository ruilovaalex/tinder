import type { UserRepository } from '../domain/user.repository';
export declare class RegisterUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(name: string, email: string, age: number): Promise<import("../domain/user.entity").UserEntity>;
}
