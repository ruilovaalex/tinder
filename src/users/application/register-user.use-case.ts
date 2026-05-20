import { Inject, Injectable } from '@nestjs/common';
import { PROFILE_REPOSITORY } from '../domain/repositories/profile.repository';
import type { ProfileRepository } from '../domain/repositories/profile.repository';
import { SUBSCRIPTION_REPOSITORY } from '../domain/repositories/subscription.repository';
import type { SubscriptionRepository } from '../domain/repositories/subscription.repository';
import { USER_REPOSITORY } from '../domain/repositories/user.repository';
import type { UserRepository } from '../domain/repositories/user.repository';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: ProfileRepository,
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(name: string, email: string, age: number) {
    if (age < 18) throw new Error('Debes ser mayor de edad para usar Tinder');

    const user = await this.userRepository.create({ name, email, age });

    await this.profileRepository.createEmptyProfile(user.id);
    await this.subscriptionRepository.createDefaultSubscription(user.id);

    return user;
  }
}
