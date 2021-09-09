import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import {LoggerMiddleware} from "./logger.middleware";

@Module({
  controllers: [], //AppController
  providers: [], //AppService
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
      //autoLoadModels: true
    }),
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
