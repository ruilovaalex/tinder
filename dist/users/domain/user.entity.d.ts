export declare class UserEntity {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly age: number;
    readonly createdAt?: Date | undefined;
    readonly updatedAt?: Date | undefined;
    constructor(id: number, name: string, email: string, age: number, createdAt?: Date | undefined, updatedAt?: Date | undefined);
}
