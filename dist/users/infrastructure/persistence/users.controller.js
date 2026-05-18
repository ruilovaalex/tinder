"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const register_user_use_case_1 = require("../../application/register-user.use-case");
const get_all_users_use_case_1 = require("../../application/get-all-users.use-case");
const give_like_use_case_1 = require("../../application/give-like.use-case");
const update_profile_use_case_1 = require("../../application/update-profile.use-case");
const add_music_use_case_1 = require("../../application/add-music.use-case");
const send_message_use_case_1 = require("../../application/send-message.use-case");
const add_photo_use_case_1 = require("../../application/add-photo.use-case");
const change_subscription_use_case_1 = require("../../application/change-subscription.use-case");
let UsersController = class UsersController {
    registerUserUseCase;
    getAllUsersUseCase;
    giveLikeUseCase;
    updateProfileUseCase;
    addMusicUseCase;
    sendMessageUseCase;
    addPhotoUseCase;
    changeSubscriptionUseCase;
    constructor(registerUserUseCase, getAllUsersUseCase, giveLikeUseCase, updateProfileUseCase, addMusicUseCase, sendMessageUseCase, addPhotoUseCase, changeSubscriptionUseCase) {
        this.registerUserUseCase = registerUserUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.giveLikeUseCase = giveLikeUseCase;
        this.updateProfileUseCase = updateProfileUseCase;
        this.addMusicUseCase = addMusicUseCase;
        this.sendMessageUseCase = sendMessageUseCase;
        this.addPhotoUseCase = addPhotoUseCase;
        this.changeSubscriptionUseCase = changeSubscriptionUseCase;
    }
    async register(body) {
        return await this.registerUserUseCase.execute(body.name, body.email, body.age);
    }
    async findAll() {
        return await this.getAllUsersUseCase.execute();
    }
    async giveLike(body) {
        return await this.giveLikeUseCase.execute(body.likerId, body.likedId);
    }
    async updateProfile(body) {
        return await this.updateProfileUseCase.execute(body.userId, body.bio, body.gender, body.city);
    }
    async addMusic(body) {
        return await this.addMusicUseCase.execute(body.userId, { title: body.title, artist: body.artist, genre: body.genre });
    }
    async sendMessage(body) {
        return await this.sendMessageUseCase.execute(body.chatRoomId, body.senderId, body.content);
    }
    async getMessages(roomId) {
        return await this.sendMessageUseCase.getHistory(roomId);
    }
    async addPhoto(body) {
        return await this.addPhotoUseCase.execute(body.userId, body.url);
    }
    async updateSub(body) {
        return await this.changeSubscriptionUseCase.execute(body.userId, body.plan);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('like'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "giveLike", null);
__decorate([
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('music'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addMusic", null);
__decorate([
    (0, common_1.Post)('chat/send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('chat/:roomId'),
    __param(0, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)('photo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPhoto", null);
__decorate([
    (0, common_1.Post)('subscription'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateSub", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [register_user_use_case_1.RegisterUserUseCase,
        get_all_users_use_case_1.GetAllUsersUseCase,
        give_like_use_case_1.GiveLikeUseCase,
        update_profile_use_case_1.UpdateProfileUseCase,
        add_music_use_case_1.AddMusicUseCase,
        send_message_use_case_1.SendMessageUseCase,
        add_photo_use_case_1.AddPhotoUseCase,
        change_subscription_use_case_1.ChangeSubscriptionUseCase])
], UsersController);
//# sourceMappingURL=users.controller.js.map