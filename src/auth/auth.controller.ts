import { Body, Controller, Post, HttpStatus, HttpCode, Get, Dependencies } from '@nestjs/common';
import { LoginRequest } from "../domain/LoginRequest"
import { AuthService, IAuthService } from "./auth.service"
import { AuthToken } from '../domain/AuthToken';

@Controller("auth")
@Dependencies([AuthService])
export class AuthController {
    private authService:IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }
    
    @Post("authenticate")
    public async authenticate(@Body() loginRequest: LoginRequest) {
        return this.authService.authenticate(loginRequest);
    }

    @Get("sample")
    public async sample() {
        return {"test":"test"};
    }

}