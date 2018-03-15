import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from "./auth/auth.module"
import { UserModule } from "./users/users.module"
import { WykopModule } from "./wykop/wykop.module"
@Module({
  imports: [UserModule, AuthModule, WykopModule],
  controllers: [AppController]
})
export class ApplicationModule {}
