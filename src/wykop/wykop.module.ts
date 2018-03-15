import { Module } from "@nestjs/common";
import { WykopService } from "./wykop.service";
import { WykopController } from "./wykop.controller"

@Module({
    controllers: [WykopController],
    components: [WykopService],
    exports: [WykopService]
})
export class WykopModule{

}