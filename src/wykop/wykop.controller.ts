import { Controller, Get } from "@nestjs/common";
import { WykopService } from "./wykop.service";

@Controller("wykop")
export class WykopController {

    constructor(readonly wykopService: WykopService){};

    @Get("all")
    getAll() {
        return this.wykopService.getMicroblogNews();
    }
}