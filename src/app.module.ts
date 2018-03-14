import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./user/user.module"
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "db",
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    entities: ["src/**/**.entity{.ts,.js}"],
    synchronize: true
  })],
  controllers: [AppController]
})
export class ApplicationModule {}
