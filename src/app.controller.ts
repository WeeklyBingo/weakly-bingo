import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get("env")
  env() {
    return process.env;
  }

	@Get()
	root(): string {
    return `Hello`;
  }
}
