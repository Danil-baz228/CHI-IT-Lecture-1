import {
    JsonController,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
} from "routing-controllers";
import { IsNotEmpty, IsEmail } from "class-validator";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";

// Объявляем класс DTO перед использованием в контроллере
class CreateUserDto {
    @IsNotEmpty()
    user!: string;

    @IsEmail()
    email!: string;
}

@JsonController()
export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    

    @Get('/users')
    async getAllUsers() {
        return await this.userRepository.find();
    }

    @Post('/users')
    async createUser(@Body() userData: CreateUserDto) {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    @Patch('/users/:id')
    async updateUser(@Param('id') id: string, @Body() userData: Partial<User>) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) return { error: "User not found" };

        Object.assign(user, userData);
        return await this.userRepository.save(user);
    }

    @Delete('/users/:id')
    async deleteUser(@Param('id') id: string) {
        const result = await this.userRepository.delete(id);
        return result.affected
            ? { message: "User deleted successfully" }
            : { error: "User not found" };
    }
}
