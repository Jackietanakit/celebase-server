import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { SigninDto } from "./dto/signin.dto";
import { AuthException } from "src/common/exceptions";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new AuthException("Email not found", 404);

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new AuthException("Invalid password", 401);

    return user;
  }

  async signin(data: SigninDto) {
    const user = await this.usersService.findOneByEmail(data.email);
    delete user.password;
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
