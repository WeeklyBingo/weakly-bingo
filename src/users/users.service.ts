import { User } from "../domain/User";
import { Component } from "@nestjs/common";


export interface IUserService {
    getUserByLogin(login: string): Promise<User>;
}

@Component()
export class UserService implements IUserService {

    getUserByLogin(login: string): Promise<User> {
        return new Promise<User>((resolve, reject)=> {
            //todo
            if (login == "test") {
                resolve({
                    login: "test",
                    password: "kajak123",
                    roles :["admin"]
                })
            } else {
                reject("User does not exists");
            }
        });
    }

}