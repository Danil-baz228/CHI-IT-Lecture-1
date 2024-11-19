import { JsonController, Get, Post, Patch, Delete, Param, Body } from 'routing-controllers';
import { IsEmail, IsNotEmpty } from 'class-validator';
import * as fs from 'fs';


const USERS_FILE = './users.json';


class CreateUserDto {
    @IsNotEmpty()
    user?: string;

    @IsEmail()
    email?: string;
}

@JsonController()
export class UserController {
    readUsersFromFile() {
        try {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    writeUsersToFile(users: any) {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    }

    @Get('/')
    getAuthor() {
        return { author: 'Ваше Ім\'я' };
    }

    @Get('/users')
    getAllUsers() {
        return this.readUsersFromFile();
    }

    @Post('/users')
    createUser(@Body() userData: CreateUserDto) {
        const users = this.readUsersFromFile();
        const newUser = { id: Date.now().toString(), ...userData };
        users.push(newUser);
        this.writeUsersToFile(users);
        return newUser;
    }

    @Patch('/users/:id')
    updateUser(@Param('id') id: string, @Body() userData: Partial<CreateUserDto>) {
        const users = this.readUsersFromFile();
        const userIndex = users.findIndex((u: any) => u.id === id);

        if (userIndex === -1) {
            return { error: 'User not found' };
        }

        users[userIndex] = { ...users[userIndex], ...userData };
        this.writeUsersToFile(users);
        return users[userIndex];
    }

    @Delete('/users/:id')
    deleteUser(@Param('id') id: string) {
        const users = this.readUsersFromFile();
        const userIndex = users.findIndex((u: any) => u.id === id);

        if (userIndex === -1) {
            return { error: 'User not found' };
        }

        users.splice(userIndex, 1);
        this.writeUsersToFile(users);
        return { message: 'User deleted successfully' };
    }
}
