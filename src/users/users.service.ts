import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';  
import { CreateUserDto } from './dto/create.user.dto'; 

@Injectable()
export class UsersService {
  userRepository: any;
  constructor(
    @InjectModel(User)
    private userEntity: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userEntity.findAll();
  }

  async getAllUsers() {
    const users = await this.userRepository.findOne();
    return users;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    return user;
    
    }

  findOne(id: string): Promise<User> {
    return this.userEntity.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async getUserByEmail(email: string) {
      const users = await this.userRepository.findOne({where: {email}, include: {all: true}})
      return users;
  } 

}