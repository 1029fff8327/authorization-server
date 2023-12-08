import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from 'src/users/dto/add.role.dto';

@Injectable()
export class UsersService {
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }   

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) {}

async createUser(dto: CreateUserDto) {
const user = await this.userRepository.create(dto);
const role = await this.roleService.getRoleByValue("ADMIN")
await user.$set('roles', [role.id])
user.roles = [role ]
return user;
}

async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
        await user.$add('role', role.id);
        return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }
}
