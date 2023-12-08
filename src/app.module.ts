import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule} from '@nestjs/config';
import { RolesModule } from './roles/roles.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ 
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
     }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
    }),
     UsersModule, 
     AuthModule, RolesModule],
     
})
export class AppModule {}
