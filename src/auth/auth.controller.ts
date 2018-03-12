import { Body, Controller, Post, HttpStatus, HttpCode, Get, Dependencies } from '@nestjs/common';
import { LoginRequest } from "../domain/LoginRequest"
import { AuthService, IAuthService } from "./auth.service"
import { AuthToken } from '../domain/AuthToken';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post("authenticate")
    public async authenticate(@Body() loginRequest: LoginRequest) {
        return this.authService.authenticate(loginRequest);
    }

    @Get("sample")
    public async sample() {
        return {"test":"test"};
    }

}