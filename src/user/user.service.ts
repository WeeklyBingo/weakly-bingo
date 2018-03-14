import { User } from "./user.entity";
import { Component, Inject } from "@nestjs/common";
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/create-user.dto";
import { validate, ValidationError } from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";

export interface IUserService {
    getUserByLogin(login: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
}

@Component()
export class UserService implements IUserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    createUser(createUserDto: CreateUserDto): Promise<User> {
        return new Promise<User>((resolve, reject)=> {
            let userToSave: User = new User();
            userToSave.login = createUserDto.login;
            userToSave.password = createUserDto.password;
            userToSave.firstName = createUserDto.firstName;
            userToSave.lastName = createUserDto.lastName;
            userToSave.age = createUserDto.age;
            userToSave.email = createUserDto.email;
            userToSave.emailVerified = false;
            validate(userToSave).then((errors: ValidationError[])=> {
                if (errors.length == 0) {
                    return this.userRepository.save(userToSave).then((user: User)=> {
                        resolve(user);
                    }).catch((error)=> {
                        reject(error);
                    })
                } else {
                    console.error(errors.map(error=> error.constraints));
                    reject(errors.map(error => error.constraints));
                }
            });
        })
    }

    getUserByLogin(login: string): Promise<User> {
        return new Promise<User>((resolve, reject)=> {
          this.userRepository.findOne({'login': login}).then((user: User)=> { 
              if (user == undefined) {
                reject("User does not exists");
              } else {
                resolve(user);
              }
          }).catch((error) => {
              reject(error);
          })
        });
    }

    getAllUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject)=> {
            resolve(this.userRepository.find());
        });
    }

}