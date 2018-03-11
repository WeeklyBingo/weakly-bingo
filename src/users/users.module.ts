import { Module } from "@nestjs/common";
import { UserService } from "./users.service";

@Module({
    components: [UserService],
    exports: [UserService]
})
export class UserModule{

}