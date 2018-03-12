import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./users/users.module"

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController]
})
export class ApplicationModule {}
