import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, DataType, Table, BelongsToMany, HasMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-role.model"; 

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ry', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '01927328', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}