export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly age: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}