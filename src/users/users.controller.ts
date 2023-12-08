import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity'; 
import { CreateUserDto } from './dto/create.user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'}) 
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }
}
 