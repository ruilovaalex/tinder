import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/users/application/register-user.use-case';
import { GetAllUsersUseCase } from 'src/users/application/get-all-users.use-case';
import { GiveLikeUseCase } from 'src/users/application/give-like.use-case';
import { UpdateProfileUseCase } from 'src/users/application/update-profile.use-case';
import { AddMusicUseCase } from 'src/users/application/add-music.use-case';
import { SendMessageUseCase } from 'src/users/application/send-message.use-case';
import { AddPhotoUseCase } from 'src/users/application/add-photo.use-case';
import { ChangeSubscriptionUseCase } from 'src/users/application/change-subscription.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly giveLikeUseCase: GiveLikeUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly addMusicUseCase: AddMusicUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly addPhotoUseCase: AddPhotoUseCase,
    private readonly changeSubscriptionUseCase: ChangeSubscriptionUseCase,
  ) {}

  // Registro de Usuario 
  @Post('register')
  async register(@Body() body: { name: string; email: string; age: number }) {
    return await this.registerUserUseCase.execute(
      body.name, 
      body.email, 
      body.age
    );
  }

  // Listar todos los usuarios 
  @Get()
  async findAll() {
    return await this.getAllUsersUseCase.execute();
  }

  //  likes y Matches
  @Post('like')
  async giveLike(@Body() body: { likerId: number; likedId: number }) {
    return await this.giveLikeUseCase.execute(
      body.likerId, 
      body.likedId
    );
  }

  //  Actualizar Perfil 
  @Post('profile')
  async updateProfile(
    @Body() body: { userId: number; bio: string; gender: string; city: string }
  ) {
    return await this.updateProfileUseCase.execute(
      body.userId,
      body.bio,
      body.gender,
      body.city
    );
  }

  //  Añadir Música Favorita
  @Post('music')
  async addMusic(
    @Body() body: { userId: number; title: string; artist: string; genre?: string }
  ) {
    return await this.addMusicUseCase.execute(
      body.userId,
      { title: body.title, artist: body.artist, genre: body.genre }
    );
  }

  //  Enviar Mensaje a una ChatRoom
  @Post('chat/send')
  async sendMessage(
    @Body() body: { chatRoomId: number; senderId: number; content: string }
  ) {
    return await this.sendMessageUseCase.execute(
      body.chatRoomId,
      body.senderId,
      body.content
    );
  }

  //  Obtener historial de mensajes de una sala
  @Get('chat/:roomId')
  async getMessages(@Param('roomId', ParseIntPipe) roomId: number) {
    return await this.sendMessageUseCase.getHistory(roomId);
  }

  //  Añadir foto al carrusel del usuario
  @Post('photo')
  async addPhoto(@Body() body: { userId: number; url: string }) {
    return await this.addPhotoUseCase.execute(body.userId, body.url);
  }

  //  Cambiar plan de suscripción
  @Post('subscription')
  async updateSub(@Body() body: { userId: number; plan: 'FREE' | 'PREMIUM' | 'GOLD' }) {
    return await this.changeSubscriptionUseCase.execute(body.userId, body.plan);
  }
  
}