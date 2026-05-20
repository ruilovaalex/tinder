import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './application/register-user.use-case';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { GetAllUsersUseCase } from './application/get-all-users.use-case';
import { GiveLikeUseCase } from './application/give-like.use-case';
import { UpdateProfileUseCase } from './application/update-profile.use-case';
import { AddMusicUseCase } from './application/add-music.use-case';
import { SendMessageUseCase } from './application/send-message.use-case';
import { AddPhotoUseCase } from './application/add-photo.use-case';
import { ChangeSubscriptionUseCase } from './application/change-subscription.use-case';
import { UserPrismaService } from '../prisma-clients/user-prisma.service';
import { InteractionPrismaService } from '../prisma-clients/interaction-prisma.service';
import { ChatPrismaService } from '../prisma-clients/chat-prisma.service';
import { SubscriptionPrismaService } from '../prisma-clients/subscription-prisma.service';
import { UsersController } from './infrastructure/controllers/users.controller';
import { PrismaProfileRepository } from './infrastructure/persistence/prisma-profile.repository';
import { PrismaInteractionRepository } from './infrastructure/persistence/prisma-interaction.repository';
import { PrismaChatRepository } from './infrastructure/persistence/prisma-chat.repository';
import { PrismaSubscriptionRepository } from './infrastructure/persistence/prisma-subscription.repository';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { PROFILE_REPOSITORY } from './domain/repositories/profile.repository';
import { INTERACTION_REPOSITORY } from './domain/repositories/interaction.repository';
import { CHAT_REPOSITORY } from './domain/repositories/chat.repository';
import { SUBSCRIPTION_REPOSITORY } from './domain/repositories/subscription.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UserPrismaService,
    InteractionPrismaService,
    ChatPrismaService,
    SubscriptionPrismaService,
    RegisterUserUseCase,
    GetAllUsersUseCase,
    GiveLikeUseCase,
    UpdateProfileUseCase,
    AddMusicUseCase,
    SendMessageUseCase,
    AddPhotoUseCase,
    ChangeSubscriptionUseCase,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: PROFILE_REPOSITORY, useClass: PrismaProfileRepository },
    { provide: INTERACTION_REPOSITORY, useClass: PrismaInteractionRepository },
    { provide: CHAT_REPOSITORY, useClass: PrismaChatRepository },
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useClass: PrismaSubscriptionRepository,
    },
  ],
})
export class UsersModule {}
