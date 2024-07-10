import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { SigninDto } from "./dto/signin.dto";
import { LocalAuthGuard } from "./local.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/signin")
  async signin(@Body() signInDto: SigninDto) {
    return this.authService.signin(signInDto);
  }
}
