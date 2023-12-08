import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:(configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + '//**/*.entity{.js, .ts}'],
      synchronize: true,
      }),
      inject: [ConfigService],
    }), 
    AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
