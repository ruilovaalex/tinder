import { RegisterUserUseCase } from 'src/users/application/register-user.use-case';
import { GetAllUsersUseCase } from 'src/users/application/get-all-users.use-case';
import { GiveLikeUseCase } from 'src/users/application/give-like.use-case';
import { UpdateProfileUseCase } from 'src/users/application/update-profile.use-case';
import { AddMusicUseCase } from 'src/users/application/add-music.use-case';
import { SendMessageUseCase } from 'src/users/application/send-message.use-case';
import { AddPhotoUseCase } from 'src/users/application/add-photo.use-case';
import { ChangeSubscriptionUseCase } from 'src/users/application/change-subscription.use-case';
export declare class UsersController {
    private readonly registerUserUseCase;
    private readonly getAllUsersUseCase;
    private readonly giveLikeUseCase;
    private readonly updateProfileUseCase;
    private readonly addMusicUseCase;
    private readonly sendMessageUseCase;
    private readonly addPhotoUseCase;
    private readonly changeSubscriptionUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase, getAllUsersUseCase: GetAllUsersUseCase, giveLikeUseCase: GiveLikeUseCase, updateProfileUseCase: UpdateProfileUseCase, addMusicUseCase: AddMusicUseCase, sendMessageUseCase: SendMessageUseCase, addPhotoUseCase: AddPhotoUseCase, changeSubscriptionUseCase: ChangeSubscriptionUseCase);
    register(body: {
        name: string;
        email: string;
        age: number;
    }): Promise<import("../../domain/user.entity").UserEntity>;
    findAll(): Promise<import("../../domain/user.entity").UserEntity[]>;
    giveLike(body: {
        likerId: number;
        likedId: number;
    }): Promise<{
        match: boolean;
        message: string;
        chatRoomId: any;
    } | {
        match: boolean;
        message: string;
        chatRoomId?: undefined;
    }>;
    updateProfile(body: {
        userId: number;
        bio: string;
        gender: string;
        city: string;
    }): Promise<any>;
    addMusic(body: {
        userId: number;
        title: string;
        artist: string;
        genre?: string;
    }): Promise<any>;
    sendMessage(body: {
        chatRoomId: number;
        senderId: number;
        content: string;
    }): Promise<any>;
    getMessages(roomId: number): Promise<any[]>;
    addPhoto(body: {
        userId: number;
        url: string;
    }): Promise<any>;
    updateSub(body: {
        userId: number;
        plan: 'FREE' | 'PREMIUM' | 'GOLD';
    }): Promise<any>;
}
