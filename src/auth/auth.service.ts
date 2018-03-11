import { User } from "../domain/User"
import { AuthToken } from "../domain/AuthToken"
import { Component, Inject, Dependencies } from "@nestjs/common";
import { LoginRequest } from "../domain/LoginRequest"
import { IUserService, UserService } from "../users/users.service";
import { sign } from 'jsonwebtoken';

export interface IAuthService {
    authenticate(loginDto: LoginRequest): Promise<AuthToken>;
    isValid(user: User): Promise<boolean>;
}

@Component()
export class AuthService implements IAuthService {
    private userService: IUserService;

    constructor(userService: UserService){
        this.userService = userService;
    }

    authenticate(loginDto: LoginRequest): Promise<AuthToken> {
        return new Promise<AuthToken>((resolve, reject)=> {
            this.userService.getUserByLogin(loginDto.login).then((user: User)=> {    
                if (user.password == loginDto.password) {
                    let expiresIn = '48h', secretOrKey = "12345";
                    let payload = { login: loginDto.login };
                    let token = sign(payload, secretOrKey, { expiresIn });
                    resolve({token: token, expiresIn: expiresIn});
                } else {
                    reject("Invalid password");
                }
            }).catch((error)=> {
                reject(error);
            })
        });
    }

    isValid(user: User): Promise<boolean> {
        return new Promise<boolean>((resolve, reject)=> {
            resolve(true)
        });
    }
}

