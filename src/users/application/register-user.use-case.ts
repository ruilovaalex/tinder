import { Injectable, Inject } from '@nestjs/common';
// Agregamos la palabra 'type' antes de UserRepository
import type { UserRepository } from '../domain/user.repository'; 

@Injectable()
export class RegisterUserUseCase {
  
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async execute(name: string, email: string, age: number) {
   
    if (age < 18) throw new Error('Debes ser mayor de edad para usar Tinder');

    return await this.userRepository.create({ name, email, age });
  }
}