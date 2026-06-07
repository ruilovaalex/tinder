import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import type { AuthenticatedUser } from '../../../auth/interfaces/authenticated-user.interface';
import { AddMusicUseCase } from '../../application/add-music.use-case';
import { AddPhotoUseCase } from '../../application/add-photo.use-case';
import { ChangeSubscriptionUseCase } from '../../application/change-subscription.use-case';
import { GetAllUsersUseCase } from '../../application/get-all-users.use-case';
import { GiveLikeUseCase } from '../../application/give-like.use-case';
import { SendMessageUseCase } from '../../application/send-message.use-case';
import { UpdateProfileUseCase } from '../../application/update-profile.use-case';
import { AddMusicDto } from '../../dto/add-music.dto';
import { AddPhotoDto } from '../../dto/add-photo.dto';
import { ChangeSubscriptionDto } from '../../dto/change-subscription.dto';
import { GiveLikeDto } from '../../dto/give-like.dto';
import { SendMessageDto } from '../../dto/send-message.dto';
import { UpdateProfileDto } from '../../dto/update-profile.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly giveLikeUseCase: GiveLikeUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly addMusicUseCase: AddMusicUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly addPhotoUseCase: AddPhotoUseCase,
    private readonly changeSubscriptionUseCase: ChangeSubscriptionUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getAllUsersUseCase.execute();
  }

  @Post('like')
  giveLike(@CurrentUser() user: AuthenticatedUser, @Body() body: GiveLikeDto) {
    return this.giveLikeUseCase.execute(user.id, body.likedId);
  }

  @Patch('profile')
  updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: UpdateProfileDto,
  ) {
    return this.updateProfileUseCase.execute(
      user.id,
      body.bio,
      body.gender,
      body.city,
    );
  }

  @Post('music')
  addMusic(@CurrentUser() user: AuthenticatedUser, @Body() body: AddMusicDto) {
    return this.addMusicUseCase.execute(user.id, body);
  }

  @Post('chat/send')
  sendMessage(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: SendMessageDto,
  ) {
    return this.sendMessageUseCase.execute(
      body.chatRoomId,
      user.id,
      body.content,
    );
  }

  @Get('chat/:roomId')
  getMessages(
    @CurrentUser() user: AuthenticatedUser,
    @Param('roomId', ParseIntPipe) roomId: number,
  ) {
    return this.sendMessageUseCase.getHistory(roomId, user.id);
  }

  @Post('photo')
  addPhoto(@CurrentUser() user: AuthenticatedUser, @Body() body: AddPhotoDto) {
    return this.addPhotoUseCase.execute(user.id, body.url);
  }

  @Patch('subscription')
  updateSubscription(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: ChangeSubscriptionDto,
  ) {
    return this.changeSubscriptionUseCase.execute(user.id, body.plan);
  }
}
