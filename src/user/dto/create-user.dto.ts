import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {

  readonly login: string;
  readonly email: string;
  readonly password: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly age?: number;

}