import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject, Dependencies } from '@nestjs/common';
import { AuthService, IAuthService } from '../auth.service';


@Component()
export class JwtStrategy extends Strategy {

    private authService: IAuthService;

    constructor(authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: "12345",
        },
        async (req, payload, next) => await this.verify(req, payload, next),
        );
        passport.use(this);
  }

  public async verify(req, payload, done) {
    const isValid = await this.authService.isValid(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}