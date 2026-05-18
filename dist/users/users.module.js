"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./infrastructure/persistence/users.controller");
const register_user_use_case_1 = require("./application/register-user.use-case");
const prisma_user_repository_1 = require("./infrastructure/persistence/prisma-user.repository");
const prisma_service_1 = require("../prisma.service");
const get_all_users_use_case_1 = require("./application/get-all-users.use-case");
const give_like_use_case_1 = require("./application/give-like.use-case");
const update_profile_use_case_1 = require("./application/update-profile.use-case");
const add_music_use_case_1 = require("./application/add-music.use-case");
const send_message_use_case_1 = require("./application/send-message.use-case");
const add_photo_use_case_1 = require("./application/add-photo.use-case");
const change_subscription_use_case_1 = require("./application/change-subscription.use-case");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [
            prisma_service_1.PrismaService,
            register_user_use_case_1.RegisterUserUseCase,
            get_all_users_use_case_1.GetAllUsersUseCase,
            give_like_use_case_1.GiveLikeUseCase,
            update_profile_use_case_1.UpdateProfileUseCase,
            add_music_use_case_1.AddMusicUseCase,
            send_message_use_case_1.SendMessageUseCase,
            add_photo_use_case_1.AddPhotoUseCase,
            change_subscription_use_case_1.ChangeSubscriptionUseCase,
            { provide: 'UserRepository', useClass: prisma_user_repository_1.PrismaUserRepository },
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map