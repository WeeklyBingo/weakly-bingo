
import { Get, Controller, Param, Bind, Post, Body } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { validate } from 'class-validator';

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() createUserDto : CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
      return this.userService.getAllUsers();
    }

    @Get(":login")
    @Bind(Param('login'))
    getUserByLogin(login: string): Promise<User> {
        return this.userService.getUserByLogin(login);
    }

}
