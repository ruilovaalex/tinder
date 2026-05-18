import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../domain/user.repository';

@Injectable()
export class ChangeSubscriptionUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(userId: number, plan: 'FREE' | 'PREMIUM' | 'GOLD') {
    return await this.userRepository.updateSubscription(userId, plan);
  }
}