"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    id;
    name;
    email;
    age;
    createdAt;
    updatedAt;
    constructor(id, name, email, age, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map