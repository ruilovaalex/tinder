import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/persistence/users.controller';//
import { RegisterUserUseCase } from './application/register-user.use-case'; //
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository'; //
import { PrismaService } from '../prisma.service'; //
import { GetAllUsersUseCase } from './application/get-all-users.use-case';
import { GiveLikeUseCase } from './application/give-like.use-case';
import { UpdateProfileUseCase } from './application/update-profile.use-case';
import { AddMusicUseCase } from './application/add-music.use-case';
import { SendMessageUseCase } from './application/send-message.use-case';
import { AddPhotoUseCase } from './application/add-photo.use-case';
import { ChangeSubscriptionUseCase } from './application/change-subscription.use-case';

@Module({
  controllers: [UsersController],
 providers: [
  PrismaService,
  RegisterUserUseCase,
  GetAllUsersUseCase,
  GiveLikeUseCase,
  UpdateProfileUseCase,
  AddMusicUseCase,   
  SendMessageUseCase,
  AddPhotoUseCase,
  ChangeSubscriptionUseCase,
  { provide: 'UserRepository', useClass: PrismaUserRepository },
],
})
export class UsersModule {}