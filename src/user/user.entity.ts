import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Length, IsOptional, IsEmail } from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @Length(6, 20)
    login: string;

    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column()
    emailVerified: boolean;

    @Column()
    @Length(6, 20)
    password: string;

    @Column({nullable: true})
    @Length(2, 20)
    @IsOptional()
    firstName?: string;

    @Column({nullable: true})
    @Length(2, 20)
    @IsOptional()
    lastName?: string;

    @Column({nullable: true})
    @IsOptional()
    age?: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}