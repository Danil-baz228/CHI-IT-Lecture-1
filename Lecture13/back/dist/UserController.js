"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const ormconfig_1 = require("./ormconfig");
const User_1 = require("./entities/User");

let UserController = class UserController {
    constructor() {
        this.userRepository = ormconfig_1.AppDataSource.getRepository(User_1.User);
    }

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async createUser(userData) {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async updateUser(id, userData) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) return { error: "User not found" };

        Object.assign(user, userData);
        return await this.userRepository.save(user);
    }

    async deleteUser(id) {
        const result = await this.userRepository.delete(id);
        return result.affected
            ? { message: "User deleted successfully" }
            : { error: "User not found" };
    }
};

UserController = __decorate([
    (0, routing_controllers_1.JsonController)()
], UserController);

exports.UserController = UserController;
