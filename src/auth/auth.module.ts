import {
    Module,
    NestModule,
    MiddlewaresConsumer,
    RequestMethod,
  } from '@nestjs/common';
import * as passport from 'passport';
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UserModule } from "../users/users.module";
import { JwtStrategy } from "./passport/jwt.strategy"

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    components: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
      consumer
        .apply(passport.authenticate('jwt', {session: false}))
        .forRoutes({path: '/auth/sample', method: RequestMethod.ALL});
    }
}